import { MongoClient } from "mongodb";
import { Document } from "mongodb";

export function getMongo<T extends Document = any>(name: string) {
    const client = new MongoClient(process.env.MONGO_URI!);
    const database = client.db("cossiedev");
    const collection = database.collection<T>(name);

    return { collection };
}
