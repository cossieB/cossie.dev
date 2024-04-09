import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import { getMongo } from "~/utils/getMongo";
import { ExerciseUser } from "../(exerciseApi)";
import { ObjectId } from "mongodb";

export async function POST(event: APIEvent) {
    const contentType = event.request.headers.get("Content-Type");
    let description, duration, date: unknown
    if (!contentType) 
        return json({error: "Invalid content type"})
    else if (contentType.includes("application/x-www-form-urlencoded")) {
        ({description, duration, date} = Object.fromEntries(await event.request.formData()))
    }
    else if (contentType.includes("application/json")) {
        ({description, duration, date} = await event.request.json())

    }
    if (typeof date !== "string")
        return json({error: "Invalid"})

    const {_id} = event.params; 
    if (_id.length != 24) 
        return json({error: "User not found"}, {status: 404})   

    if (!duration || Number.isNaN(Number(duration))) {
        return json('Invalid Duration', {status: 400})
    }
    if (!description) {
        return json('Description required', {status: 400})
    }
    let dateTemp = date ? Date.parse(date) : Date.now()
    
    if (Number.isNaN(dateTemp)) return json('Invalid Date', {status: 400})

    let newDate = new Date(dateTemp)
    const {collection} = getMongo<ExerciseUser>('exercise')
    try {
        const obj = {description, duration: Number(duration), date: newDate}
        const result = await collection.findOneAndUpdate({_id: new ObjectId(_id)}, {
            $push: {
                log: obj
            },
        }, {returnDocument: "after"})
        if (!result)
            return json({error: "User not found"}, {status: 404})    
        return json(result, {status: 201})

    } 
    catch (e: any) {
        console.log(e)
        json('Something went wrong', {status: 500})
    }
}

export async function GET(event: APIEvent) {
    const {_id} = event.params; 
    if (_id.length != 24) 
        return json({error: "User not found"}, {status: 404})    
    
    const {collection} = getMongo<ExerciseUser>("exercise");
    const search = new URL(event.request.url).searchParams
    const {from, to, limit} = Object.fromEntries(search)
    const fromDate = Date.parse(from) || 0
    const toDate = Date.parse(to) || Date.now();
    const lim = Number.parseInt(limit) || Number.POSITIVE_INFINITY;

    const user = await collection.findOne({_id: new ObjectId(_id)});
    if (!user) 
        return json({error: "User not found"}, {status: 404})  

    let {username, log} = user;
    const log2 = log.filter(item => item.date.getTime() >= fromDate && item.date.getTime() <= toDate )
                    .slice(0, lim)
                    .map(item => ({
                        description: item.description,
                        duration: item.duration,
                        date: item.date.toDateString()
                    }))

    let count = log2.length
    return json({_id, count, username, log: log2})
}