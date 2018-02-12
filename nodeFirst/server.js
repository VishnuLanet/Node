const express=require('express'),
    bodyParser=require('body-parser'),
    mongoose=require('mongoose'),
    path = require('path')

var app=express()

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-dyp71.mongodb.net:27017,cluster0-shard-00-01-dyp71.mongodb.net:27017,cluster0-shard-00-02-dyp71.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin").then((res)=> console.log("respo" + res)).catch((err)=> console.log(err))

var userSchema=mongoose.Schema({
    email : String
})
var User=mongoose.model('User', userSchema)

app.use(bodyParser.urlencoded({extended:true}));
// app.set('view engine', 'html')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname +  '/login.html'))
})

app.post('/home', (req, res) => {
   // res.send(req.body.email)

    User.find({'email':req.body.email}).then((res1)=>res.sendFile(path.join(__dirname + '/home.html'),{myEmail:req.body.email})).catch((err)=>console.log(err))
})

app.post('/Regi', (req, res) => {
    let newUser=User()
    newUser.email=req.body.email
    newUser.save().then((res)=>Console.log(res)).catch((err)=>Console.log(err))
})

app.listen(5000,() => console.log("Server Connected"))
