const mail = require("nodemailer")
require("dotenv").config()
mpdule.exports = sendMail = async (req, res) => {
    let transport = mail.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });
    await transport.sendMail({
        from: process.env.NAME,
        to: req.body.email,
        subject: "Test Mail",
        html: "<p>This is a test mail from the E-Commerce system. Do not reply to this as this is auto-generated</p>"
    })
    res.json(["Success", "Email is sent successfully"])
}