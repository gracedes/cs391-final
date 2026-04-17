import {Collection, Db, MongoClient} from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;

if(!MONGO_URI){
    throw new Error("Something is wrong with your key");
}

const DB_NAME = "cs391-final";

export const POSTS_COLLECTION = "posts-collection";

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClient?: MongoClient;
    };
    if(!globalWithMongo._mongoClient){
        globalWithMongo._mongoClient = new MongoClient(MONGO_URI);
    }
    client = globalWithMongo._mongoClient;
} else {
    client = new MongoClient(MONGO_URI);
}

export const mongoDb = client.db(DB_NAME);


export default async function getCollection(collectionName: string): Promise<Collection> {
    await client.connect();
    return client.db(DB_NAME).collection(collectionName);
}