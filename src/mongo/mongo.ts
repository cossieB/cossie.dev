import { MongoClient, ObjectId } from "mongodb";

type ImgMetadata = {
    field: string;
    name: string;
    key: string;
    url: string;
    size: number;
    reference: string;
    table: "developer" | "publisher" | "platform" | "game" | "actor";
}

export default class MongoConnection {
    private client = new MongoClient(process.env.MONGO_URI!);
    private database = this.client.db("cossiedev")
    private sessionCollection = this.database.collection("sessions")
    private imageCollection = this.database.collection<ImgMetadata>("images")
    
    close = async () => {
        await this.client.close();
    }
    getSession = async (id: string) => {
        return await this.sessionCollection.findOne({_id: new ObjectId(id)})
    }
    addSession = async (data: SessionData, expires: Date) => {
        const record = await this.sessionCollection.insertOne({
            ...data,
            expires
        })
        return record.insertedId.toString()
    }
    updateSession = async (sessionId: string, data: SessionData, expires: Date) => {
        await this.sessionCollection.updateOne({_id: new ObjectId(sessionId)}, {$set: {...data, expires}})
    }
    deleteSession = async (sessionId: string) => {
        await this.sessionCollection.deleteOne({_id: new ObjectId(sessionId)})
    }
    addImages = async (obj: ImgMetadata) => {
        return this.imageCollection.insertOne(obj)
    }

}
