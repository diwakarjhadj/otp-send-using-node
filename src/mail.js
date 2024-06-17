const nodemailer=require('nodemailer');
require('dotenv').config();
let nodemail={};
const sender_email=process.env.SENDER_EMAIL;
const pass=process.env.SENDER_PASSWORD
console.log("SENder",sender_email,pass,typeof(sender_email));
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: sender_email,
        pass: pass
    }
    });
    
    nodemail.sendOTP=(email,otp)=>{
    const mailOptions={
        from: sender_email,
        to: email,
        subject: 'Verification OTP',
        text: `Your OTP code is ${otp}`,
        html: `The one Time Password has been generated it is valid for 2min <b>${otp}</b>`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("Error Sending email:::",error);
            return false
        }else{
            console.log("Email Sent::",info.message);
        }
    })
}
module.exports=nodemail;
