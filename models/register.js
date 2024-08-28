const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        unique:true,
        max:9999999999,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }

  });
  const User= mongoose.model('User', userSchema);
   module.exports=User;