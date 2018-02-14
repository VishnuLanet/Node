const express=require('express'),
    bodyparser=require('body-parser'),
    mongoose=require('mongoose');

var app=express();
app.use(bodyparser.json());

mongoose.connect("mongodb://admin:admin@cluster0-shard-00-00-dyp71.mongodb.net:27017,cluster0-shard-00-01-dyp71.mongodb.net:27017,cluster0-shard-00-02-dyp71.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    (err, res) => {
        if(!err)
            console.log('Database Connected.');
        else
            console.log('Not Connected DB.');
    });
var schema=mongoose.Schema({
    name : String
});
var userTbl=mongoose.model("User1", schema);

app.post('/Insert', function (req, res) {
   console.log(req.body);

   var tbl=userTbl();
   tbl.name=req.body.name;
   tbl.save();
   res.json({"Name" : req.body});
});

app.post('/Update', (req, res) => {
   userTbl.updateMany({_id:"5a83cf8c28a7f51e5068ccee"}, {$set:{'name': "Vishnu1"}}, (err, ress) => {
       console.log(ress);
       res.send(ress);
   });
});

app.listen(3000, () => console.log('Listening :3000*'));