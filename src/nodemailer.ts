import { google } from "googleapis";
import { createTransport } from "nodemailer";
import { type Options } from "nodemailer/lib/mailer";

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

oauth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})
const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: 'https://mail.google.com/',
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
  });

export async function sendMail(name: string, company: string, msg: string, email: string) {
    const accessToken = await oauth2Client.getAccessToken()
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
        await transport.sendMail(options);
        transport.close()
    } catch (error) {
        console.log(error)
        throw error
    }
}