var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://emmalujosephwork:u_A4k.Ckn9QD_Tj@cluster0.vux0o.mongodb.net/node demo_mongodb_createcollection.js";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});