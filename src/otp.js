const otpGenerator=require('otp-generator');
let otpStore={};
let otp={};
otp.generateOTP=()=>{
    const otp=otpGenerator.generate(6,{
        upperCaseAlphabets: false,
        specialChars: false
    });
    return otp;
},

otp.storeOTP=(email,otp)=>{
    otpStore[email]=otp;
    setTimeout(()=> delete otpStore[email],10000);
},

otp.validateotp=(email,otp)=>{
    if(otpStore[email]==undefined){
        return false;
    }
    if(otpStore[email]===otp){
            delete otpStore[email];
            return true;
        }
        return false;
},

module.exports=otp;
