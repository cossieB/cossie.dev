import nodemailer from "nodemailer"
import { type Options } from "nodemailer/lib/mailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})
export async function sendMail(opts: Options) {
    return transporter.sendMail({
        ...opts,
        name: "1Clip"
    })
}