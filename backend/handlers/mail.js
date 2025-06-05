const mail = require("nodemailer")
mpdule.exports = sendMail = async (req, res) => {
    let transport = mail.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "modhahrutav@gmail.com",
            pass: "rigr xewc ewad sobc"
        }
    });
    await transport.sendMail({
        from: "Hrutav Modha",
        to: "modhahrutav@gmail.com",
        subject: "Test Mail",
        html: "<h1>This is a test mail from the EComm system. Do not reply to this as this is auto-generated</h1>"
    })
    res.json(["Success", "Message is sent successfully"])
}