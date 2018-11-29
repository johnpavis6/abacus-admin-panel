var mongodb = require('mongodb');
var MongoClient=mongodb.MongoClient
var url = 'mongodb://localhost:27017'
console.log('Database requested')
MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err;
    var db = client.db('abacus')
    db.createCollection('techs')
    db.createCollection('non_techs')
    db.createCollection('workshops')
    module.exports = {
        techs: db.collection('techs'),
        non_techs: db.collection('non_techs'),
        workshops: db.collection('workshops'),
        ObjectID:mongodb.ObjectID,
    }
    console.log('Database Ready')
})