var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local')
router.get('/',function (req,res,next){
    res.render('login',{nav:false});
});

module.exports = router;