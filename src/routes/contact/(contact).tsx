import { APIEvent } from "solid-start";
import ContactMain from "~/components/Contact/ContactMain";
import Page from "~/components/shared/Page";

export default function ContactPage() {
    return (
        <Page title="Contact Me">
            <ContactMain />
        </Page>
    )
}

export async function POST(e: APIEvent) {
    
    const body = await e.request.json();
    console.log(body)
    return new Response("OK", {status: 200})
}