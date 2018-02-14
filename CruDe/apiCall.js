const express=require('express'),
    bodyParse=require('body-parser'),
    mongoose=require('mongoose');

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-dyp71.mongodb.net:27017,cluster0-shard-00-01-dyp71.mongodb.net:27017,cluster0-shard-00-02-dyp71.mongodb.net:27017/iOS?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",(err,res) => {
  if(!err){
      console.log("Database connected")
  }  else{
      console.log(err)
  }
});
var schema=mongoose.Schema({
    name : String,
    num : Number,
    email : String,
    Password : String,
    img : String
});
var usertbl=mongoose.model("User", schema);


var app=express();
app.use(bodyParse.json());

app.post('/Insert', (req, res)=>{
    console.log(req.body.email)
    var user=usertbl();
    user.email=req.body.email;
    user.name=req.body.name;
    user.num=req.body.num;
    user.Password=req.body.Password;
    user.save().then((ress)=>res.send(ress));
});

app.post('/Login', (req, res) => {
    console.log(req.body);
    usertbl.find({ 'email' : req.body.email , 'Password' : req.body.Password }, (err, ress) => {
        res.send(ress);
    })
});
app.post('/Select', (req, res) => {
    // console.log("Select.")
    usertbl.find({}, (err, ress) => {
        res.send(ress);
        // res.json({"msg" : ress})
    })
});

app.post('/Delete', (req, res) => {
    usertbl.deleteOne({_id : req.body.id}, (err, ress) => {
        res.send(ress);
    })
});

app.post('/Update', (res, req) => {
    usertbl.update({_id : req.body.id}, {$set:{'email' : req.body.email, 'Password' : req.body.Password, 'name' : req.body.name, 'num' : req.body.num}}, (err, ress) => {
        res.send(ress);
    })
});

app.listen(3000, () => console.log("Listening 3000 port."));