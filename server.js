const mysql =require('mysql');
const con=require('./model/db');
const express =require('express');
const path =require('path');
const app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended:true
}));

// app.use(function(req,res,next){
//  res.setHeader('Access-Controll-Allow-Origin','*');
//  next();
// })

app.use(express.static('public'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

const userroutes1 = require('./routes/userroutes');


//datbase shubham,table loginnew

//app.use('/user',userroutes1);
app.use('/',userroutes1);

app.listen(7000,()=>{
  console.log("server started on port 7000....");
});
