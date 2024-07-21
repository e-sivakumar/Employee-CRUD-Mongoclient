const { MongoClient } = require("mongodb")
let databaseConnection = null;
 async function db(){
    if(databaseConnection) return databaseConnection
    try{
    const url = process.env.URL
    const databaseName = process.env.DATABASENAME
    const client = new MongoClient(url);
    await client.connect()
    databaseConnection = client.db(databaseName)
    return databaseConnection
    }
    catch(err){
        console.log("err", err);
        return err
    }
}

module.exports = db