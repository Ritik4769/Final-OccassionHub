import Randomstring from "randomstring";
import nodemailer from "nodemailer";
var mailer = function (email, callback) {
    var Rotp = Randomstring.generate({
        length: 4,
        charset: 'numeric',
    });
    console.log("rotp : ",Rotp)

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jtichouhan@gmail.com",
            pass: "yarqddkvvazbxuzr ",
        },
        secure: true,
    });

    const mailOptions = {
        from:"jtichouhan@gmail.com",
        to: email,
        subject: `EVENTHUB`,
        text: `Hello ${email}\n Your One Time Password Is ${Rotp} Enter This Otp And Register Yourself.\nThank You`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        console.log("info : ",info)
        if (info) {
            callback( true , Rotp);
        } else {
            callback( false, error );
        //    return console.error("email send successfully : ", info);

        }
    });
}

export default mailer;
