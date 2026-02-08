import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import { ObjectId } from "mongodb";
import { getMongo } from "~/utils/getMongo";

type Issue = {
    issue_title: string,
    issue_text: string,
    created_by: string,
    project: string,
    assigned_to?: string,
    status_text?: string,
    created_on: Date,
    updated_on: Date,
    open: boolean
}

const fields = ['issue_title', 'issue_text', 'created_by', 'assigned_to', 'status_text']

export async function POST(event: APIEvent) {
    try {
        const { project } = event.params;
        const { issue_title, issue_text, created_by, assigned_to = "", status_text = "" } = await event.request.json();

        for (const field of [issue_title, issue_text, created_by, assigned_to, status_text]) {
            if (field === undefined)
                return json({ error: "required field(s) missing" }, { status: 400 })
            if (typeof field !== 'string')
                return json({ error: "All fields must be strings" }, { status: 400 })
        }

        const now = new Date()
        const { collection } = getMongo<Issue>("issues");
        const result = await collection.insertOne({
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
            project,
            created_on: now,
            updated_on: now,
            open: true
        }, {

        })

        return json({
            assigned_to,
            status_text,
            open: true,
            _id: result.insertedId,
            issue_title,
            issue_text,
            created_by,
            created_on: now,
            updated_on: now
        })
    }
    catch (e: any) {
        console.error(e)
        return json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function PUT(event: APIEvent) {
    try {
        const body = await event.request.json()
        const { _id } = body as { _id: string }
        if (!_id) return json({ error: 'missing _id' }, { status: 400 })
        if (_id.length != 24)
            return json({ error: "Issue not found" }, { status: 404 })


        if (fields.every(item => !(item in body))) {
            return json({ error: 'no update field(s) sent', '_id': _id }, { status: 400 })
        }
        const { collection } = getMongo<Issue>('issues')

        const obj: any = {}
        for (const prop in body) {
            if (fields.includes(prop.toLowerCase())) obj[prop] = body[prop] || obj[prop] || '';
        }
        if (body.open == false || body.open == 'false') obj.open = false;

        await collection.updateOne({ _id: new ObjectId(_id) }, {
            $set: {
                ...obj,
                updated_on: new Date(),
            }
        })

        return json({ result: 'successfully updated', _id })
    }
    catch (e: any) {
        console.error(e)
        return json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function DELETE(event: APIEvent) {
    try {
        const body = await event.request.json()
        const { _id } = body as { _id: string }
        if (!_id) return json({ error: 'missing _id' }, { status: 400 });
        if (_id.length != 24)
            return json({ error: "Issue not found" }, { status: 404 })
        const { collection } = getMongo<Issue>('issues')
        const result = await collection.deleteOne({ _id: new ObjectId(_id) })

        if (result.acknowledged) {
            json({ result: "successfully deleted", _id })
        }
        else {
            json({ error: "could not delete", _id }, { status: 404 })
        }
    }
    catch (e: any) {
        console.error(e)
        return json({ error: "Something went wrong" }, { status: 500 })
    }
}

export async function GET(event: APIEvent) {
    try {
        const { project } = event.params
        let query: any = { project }
        const search = new URL(event.request.url).searchParams
        for (const [key, val] of search) {console.log(val, key)
            if (fields.includes(key.toLowerCase())) 
                query[key] = val
            if (key == 'open') {
                if (val === "true")
                    query.open = true
                if (val === "false")
                    query.open = false
            }
        }
        const {collection} = getMongo<Issue>("issues"); console.log(query)
        const result = await collection.find(query).toArray()
        return json(result)
    }
    catch (e: any) {
        console.error(e)
        return json({ error: "Something went wrong" }, { status: 500 })
    }
}