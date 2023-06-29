const express= require('express');
const bodyParser= require('body-parser');
const path=require('path');
const mongoose=require('mongoose');
const cors = require('cors');

const app = express();
const port=3000;

const employeeAPI = require('./Routes/api');
app.use(bodyParser.json()); 
app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  )
app.use(cors());
app.use('/api', employeeAPI);
app.use(express.static(path.join(__dirname, 'dist')));


//connecting with MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/MEAN_CRUD')
.then((x)=>{
    console.log('Connected to MongoDB!');
})
.catch((err)=>{
console.log('Error occured in DB connection');
});

//start node server
app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404))
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    console.error(err.message) // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
  })