var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const upload = require('./multer');

passport.use(new LocalStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { nav: true });
});


router.get('/add', function (req, res, next) {
  res.render('add', { nav: true });
});

router.get('/register', function (req, res) {
  res.render('register', { nav: false });
})

router.post('/createpost', isLoggedIn, upload.single('postimage'), async function (req, res) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user: user._id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect('/profile');
})


router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/profile'
}), (req, res) => { })

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/login');
  })
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect("/login");
  }
}


router.post('/register', function (req, res) {
  const { username, fullname, email } = req.body;
  const userData = new userModel({ username, email, fullname });
  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate('local')(req, res, function () {
      res.redirect('./profile')
    })
  })
})

router.get('/profile', isLoggedIn, async (req, res) => {
  const user = await userModel
                        .findOne({ username: req.session.passport.user })
                        .populate("posts");
  res.render('profile', { user, nav: true });
})

router.post('/fileupload', isLoggedIn, upload.single("image"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  user.dp = req.file.filename;
  const userupdated = await user.save();
  res.redirect('/profile');
})

router.get('/feed',async function(req,res,next){
  const posts= await postModel.find().populate("user");
  res.render('feed',{posts,nav:true})
})

module.exports = router;
