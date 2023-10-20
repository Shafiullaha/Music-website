var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mini-login');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/sign_up', function(req,res){
    var EmailID = req.body.EmailID;
    var password = req.body.password;
    var data = {
        "EmailID":EmailID,
        "password":password,
        
    }
db.collection('Orders').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('login.html');
})
app.listen(8000);
console.log("server listening at port 3000");