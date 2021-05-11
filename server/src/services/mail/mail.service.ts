import nodemailer from "nodemailer";

export default class MailService {
    sendEmail = async (email : string,keys : string[]) => {

        let formString = ''

        for await (const key of keys) {
            console.log(key);
            formString += `Key - ${key}\n`
        }

        // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
        },
    });

    console.log(formString);

  // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "fatalerror.sm@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Thank you for your recent digital purchase from AnySoft. Details and products keys of this transaction below :?\n\n${formString}`, // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } 
}