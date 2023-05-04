import { google } from "googleapis";
import { createTransport } from "nodemailer";
import { Options } from "nodemailer/lib/mailer";

const oauth2client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

oauth2client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})

export async function sendMail(name: string, company: string, msg: string, email: string) {
    const accessToken = await oauth2client.getAccessToken()
    const transport = createTransport({
        service: 'gmail',
        auth: {
            type: "OAUTH2",
            user: process.env.FROM,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken
        }
    })
    const options: Options = {
        from: `Cossie Bot <${process.env.FROM}>`,
        to: process.env.TO,
        subject: `${name} - ${company} :: Portfolio`,
        html: `<div style="text-align: center"><h1>${company}</h1><h2>${name}</h2><h2>${email}</h2><p>${msg}</p></div>`
    }
    try {
        const result = await transport.sendMail(options);
        console.log(result)
        transport.close()
    } catch (error) {
        console.log(error)
    }
}