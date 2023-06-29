//internal imports
const express = require('express');
var app=express();
const employeeRoute = express.Router();

let Employee =require('../Models/Employee')

//get method
employeeRoute.route('/GetEmployees').get(async (req,res)=>{
    await Employee.find({}).then((function(data){
        res.json(data);
      })
    );
});

employeeRoute.route('/GetEmployeeById/:id').get(async(req,res)=>{
   await Employee.findById(req.params.id).then(function(data){
    res.json(data);
  })
});

//post method
employeeRoute.route('/CreateEmployee').post(async (req,res)=>{
await Employee.create(req.body).then(function(data){
    res.json(data);
  })
});

//update method
employeeRoute.route('/UpdateEmployee/:id').put(async(req,res,next)=>
{
await Employee.findByIdAndUpdate(req.params.id, {$set: req.body}).then(function(data){
    res.json(data);
  })
});

//delete method
employeeRoute.route('/DeleteEmployee/:id').delete(async(req,res)=>{
  await  Employee.findByIdAndDelete(req.params.id).then(function(data){
    res.json(data);
  })
})

module.exports=employeeRoute;