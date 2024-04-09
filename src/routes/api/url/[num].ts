import { APIEvent } from "@solidjs/start/server";
import { MongoClient } from "mongodb";
import { IURL } from "./(shortener)";
import { json, redirect } from "@solidjs/router"

export async function GET(event: APIEvent) {
    try {
        const client = new MongoClient(process.env.MONGO_URI!);
        const database = client.db("cossiedev");
        const collection = database.collection<IURL>("urls");
        const {num} = event.params;
        const doc = await collection.findOne({short: `/api/url/${num}`});
        await client.close()
        if (!doc)
            return json({error: "No url found", status: 404})
        return redirect(doc.original)
    } 
    catch (error) {
        console.error(error)
        return json({error: "Something went wrong. Please try again later", status: 500})
    }
}