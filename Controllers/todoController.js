const bodyParser  = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

var urlencodedString = bodyParser.urlencoded({extended: false})
var url = "mongodb://127.0.0.1:27017"
var name = 'TODOs'


// MongoClient.connect(url, { useNewUrlParser: true } ,(err, connection)=>{
//     if (err) throw err
//     var db = connection.db(name)
//     var collection = db.collection('todo');
//     // Find some documents

//     var cursor = collection.find()
//     cursor.forEach((doc)=>{
//         console.log(doc)
//     });

// });

module.exports = (app)=>{
    app.get('/todo', (req, res)=>{

        MongoClient.connect(url, { useNewUrlParser: true } ,(err, connection)=>{
            if (err) throw err
            var db = connection.db(name)
            var collection = db.collection('todo');
            // Find some documents

            collection.find({}).toArray((err, docs)=>{
                res.render('todo',{itemlist: docs})
            })
            connection.close();
        });
    })

    app.post('/todo', urlencodedString, (req, res)=>{
        MongoClient.connect(url, { useNewUrlParser: true } ,(err, connection)=>{
            if (err) throw err
            var db = connection.db(name)
            var collection = db.collection('todo');
            // Find some documents
            collection.insertOne({item: req.body.item}, (err, result)=>{
                if (err) throw err
                console.log('Successfully Inserted')
                res.redirect('todo')
            })
            connection.close();
        });
    })

    app.delete('/todo/:item', (req, res)=>{
        var a = req.params.item.replace(/\-/g, " ")
        a = a.trim()
        MongoClient.connect(url , { useNewUrlParser: true },(err, connection)=>{
            if (err) throw err
            var db = connection.db(name)
            var collection = db.collection('todo');
            // Find some documents
            collection.remove({item: a},(err, result)=>{
                console.log('Deleted Successfully!!')
                res.send('Done')
                
            })
            connection.close();
        });
        
    })

}