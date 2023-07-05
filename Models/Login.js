const mongoose=require('mongoose');
var Login=mongoose.model('Login',{
    Username:{type:String},
    Password:{type:String}
});

module.exports=Login;