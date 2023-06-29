const mongoose = require('mongoose');

var Employee= mongoose.model('Employee',{
Name:{type:String},
Email:{type:String},
Designation:{type:String},
Phone:{type:String},
Location:{type:String}
});

module.exports=Employee;