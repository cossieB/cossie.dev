import { MongoClient, ObjectId } from "mongodb";
import { SessionData } from "solid-start/session/sessions";

type Session = {
    data: SessionData;
    expires: Date
}

export default class MongoConnection {
    private client = new MongoClient(process.env.MONGO_URI!);
    private database = this.client.db("cossiedev")
    private sessionCollection = this.database.collection("sessions")
    private imageCollection = this.database.collection("images")
    
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
    addImages = async (name: string, field: string, res: object[]) => {
        const arr = res.map(x => ({...x, name: name, field: field,}))
        await this.imageCollection.insertMany(arr)
    }

}
