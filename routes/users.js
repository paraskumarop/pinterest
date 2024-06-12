var express = require('express');
var mongoose = require('mongoose');
const { Schema } = mongoose;
const plm = require('passport-local-mongoose');


// mongoose.connect('mongodb://localhost:27017/Pin');

const userSchema = new Schema({
  username: {
     type: String,
     required : true,
     unique : true,
    },
  password:{
    type: String
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type : String,
    default: '1',
  },
  email : {
    type : String,
    required: true,
  },
  fullname : {
    type : String,
    required : true,
  },
  boards:{
    type : Array,
    default :[],
  }

})

userSchema.plugin(plm);

module.exports = mongoose.model('User',userSchema);
