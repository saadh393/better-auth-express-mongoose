import mongoose from "mongoose";
import ENV from "~/configs/envs-config";

const MONGO_URI = ENV.MONGO_URI

let cached = global._mongooseConnection;

if(!cached){
    cached = global._mongooseConnection = { conn: null, promise: null };
}

async function connectDB(){
    if(cached?.conn){
        return cached.conn;
    }

    if(!cached?.promise){
        cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
            return mongoose;
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export async function getMongoClient(){
    const conn = await connectDB()
    return conn.connection.getClient().db("better-auth");
}