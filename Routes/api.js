//internal imports
const express = require('express');
const jwt = require('jsonwebtoken');
var app=express();
const employeeRoute = express.Router();

let Employee =require('../Models/Employee')
let Login=require('../Models/Login')


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}


//get method
employeeRoute.route('/GetEmployees',verifyToken).get(async (req,res)=>{
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

employeeRoute.route('/login').post(async(req,res)=>{
 // console.log(req.body);
  loginData=await Login.find({$and:[ {"Username":req.body.Username},  {"Password":req.body.Password}]});
  //console.log(loginData);
  if(Object.keys(loginData).length!=0)
  {
    let payload = {subject: loginData._id}
    let token = jwt.sign(payload, 'secretKey')
    res.status(200).send({token})   
  } 
  else 
  {
      res.status(401).send('Invalid Password')
  } 
})


module.exports=employeeRoute;