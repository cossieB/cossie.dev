import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import Translator from "./utils/translator";

export async function POST(event: APIEvent) {
    const { text, locale } = await event.request.json();
    if (text == undefined || locale == undefined) 
        return json({ error: 'Required field(s) missing' }, {status: 400})
    if (typeof text !== "string" || typeof locale !== "string")
        return json({ error: "Invalid type of text/locale"}, {status: 400})
    if (text == '') 
        return json({ error: 'No text to translate' }, {status: 400})
    if (locale != 'american-to-british' && locale != 'british-to-american') 
        return json({ error: 'Invalid value for locale field' }, {status: 400})

    const translator = new Translator(text, locale)

    const translation = translator.highlight(); 

    return json({text, translation})
}