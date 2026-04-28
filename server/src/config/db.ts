import { MongoClient, Db } from 'mongodb';

// Config layer for handling MongoDB connection.

let db: Db;

export const connectDB = async (): Promise<void> => {
    const client = new MongoClient(process.env.MONGO_URI as string);
    await client.connect();
    db = client.db('RoutinesDB');
    console.log('Successfully connected to MongoDB.');
};

export const getDB = (): Db => {
    if (!db) throw new Error('Database not initialized');
    return db;
};



// Check if MONGO_URI is being read correctly
const uri = process.env.MONGO_URI;
console.log("Checking URI:", uri); // if this logs undefined, it means the .env file is not being read correctly or MONGO_URI is missing

if (!uri) {
    throw new Error("MONGO_URI is not defined in .env file");
}