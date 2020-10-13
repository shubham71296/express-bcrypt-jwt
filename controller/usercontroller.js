const mysql     = require('mysql');
const con       = require('../model/db');
const jwt       = require('jsonwebtoken');
const bcrypt    = require('bcrypt');
// const nodemailer = require('nodemailer');
// const { body, validationResult, matchedData } = require('express-validator');
// const multer  = require('multer');
 //database demoproject 
 // table demotablenew1

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


module.exports.home = (req,res)=>{
 
  res.render('login');

};

module.exports.createacc = (req,res)=>{
 
  res.render('home');

};

module.exports.getdetail = (req,res)=>{
      var sql = 'select id,name,email from demotablenew1';
  	  con.query(sql,(err,result)=>{
  	  	if(err) throw err;
  	  	else if(result.length>0)
  	  	  res.render('userdetail',{user:req.authData.email,data:result});
  	  	else
      res.render('login');
  	  })
}


module.exports.signup = (req,res)=>{
   
   var name = req.body.name;
   var email = req.body.email;
   var password = req.body.password;
   
   var sql = 'select * from demotablenew1 where email=?';
   con.query(sql,email,(err,result)=>{
   	if(err) throw err;
   	else if(result.length>0)
   		res.render('home',{msg:'email already exist!!'});
   	else{
        bcrypt.hash(password,10,function(err,hash){
	   	 if(err) throw err;
	   	else{
	   		var sql = 'insert into demotablenew1(name,email,password) values(?,?,?)';
	   		var data = [name,email,hash];
	   		con.query(sql,data,(err)=>{
	   			if(err) throw err;
	   			else
	   			 res.render('login');
	   		})
	   	}
	   })
   	}
   })

}


module.exports.logout = (req,res)=>{
	localStorage.removeItem('myToken');
	res.render('login');
}



module.exports.login = (req,res)=>{
   
   var email = req.body.email;
   var password = req.body.password;
   var sql = 'select * from demotablenew1 where email = ?';
   con.query(sql,email,(err,result)=>{
   	if(err) throw err;
   	else if(result.length>0){
   	  //console.log(result);	
      bcrypt.compare(password,result[0].password,function(err,result1){
      	if(err) throw err;
      	else if(result1){
      	  console.log(result);
      	  console.log(result1); //here result1 return true or false
      	  jwt.sign({email:result[0].email,userId:result[0].id},'secretkey',(err,token)=>{
      	  	if(err) throw err;
      	  	else{
      	  	  localStorage.setItem('myToken',token);	
      	  	  console.log(token);
      	  	  res.render('welcome');
      	  	}
      	  })
      	}
      	else
      	  res.send('login failed password cant match!!!');
      })
   	}
   	else
   	  res.render('login',{msg:"login failed"});
   })

};













