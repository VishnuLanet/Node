// const MongoClient=require('mongodb').MongoClient;
const {MongoClient, ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
    if(err)
    {
        console.log('Error : ' + err)
    }
    else {
        console.log('Connected... to db')
        let dbo=db.db("myVsn")

        // Insert
        dbo.collection('Todos').insertOne({
            text: 'Something to do',
            complete: true
        }).then((result) => {
            console.log(JSON.stringify(result.ops, undefined, 2))
        }).catch((err1) => {
            if (err1)
                return console.log('Insert Error : ', err1)
        })

        // Search
        dbo.collection('Todos').find({complete:false}).toArray().then((docs) => {
            console.log(JSON.stringify(docs, undefined, 2))
        })

        // deleteMany
        // dbo.collection('Todos').deleteMany({complete:true}).then((result) => {
        //     console.log(result)
        // })
        //
        // // deleteOne
        // dbo.collection('Todos').deleteOne({complete:true}).then((result) => {
        //     console.log(result)
        // })
        //
        // // findOneAndDelete
        // dbo.collection('Todos').findOneAndDelete({complete:true}).then((result) => {
        //     console.log(result)
        // })

        dbo.collection('Todos').findOneAndDelete({
            _id: new ObjectID("5a6ef18c2ba3bd0ed48a14ba")
        }).then((result) => {
            cosole.log("new")
            cosole.log(JSON.stringfy(result.undefined, 2))
        })
    }
    db.close();
})