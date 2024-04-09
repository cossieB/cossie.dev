import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import { getMongo } from "../../../utils/getMongo";

export type ExerciseUser = {
    username: string;
    log: ExerciseLog[]
}

type ExerciseLog = {
    description: string;
    duration: number;
    date: Date
}

export async function POST(event: APIEvent) {
    const contentType = event.request.headers.get("Content-Type");
    let username: unknown;

    if (!contentType)
        return json({ error: "Unsupported content type" }, { status: 400 })
    if (contentType.includes("application/json")) {
        username = (await event.request.json()).username
    }
    else if (contentType.includes("application/x-www-form-urlencoded")) {
        username = (await event.request.formData()).get("username")
    }
    else
        return json({ error: "Unsupported content type" }, { status: 400 })

    if (!username || typeof username !== "string")
        return json({ error: "username must be a non-empty string" }, {status: 400})

    const {collection} = getMongo<ExerciseUser>("exercise")
    const doc = await collection.insertOne({username, log: []})

    return json({username, _id: doc.insertedId}, {status: 201})
}

