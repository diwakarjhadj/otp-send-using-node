const mail=require('./mail');
const otp=require('./otp');
let otpsendController={};

otpsendController.sendOTP=async(req,res)=>{
    console.log("Controller of otpController");
    try{
        const {email}= req.body;
        if(!email){
           return res.status(400).json({success: false,message:"Email is Required!"});
        }
        const generatedOTP=otp.generateOTP();
        otp.storeOTP(email,generatedOTP);
        const responsemail=mail.sendOTP(email,generatedOTP);
        if(responsemail==false){
            return res.status(500).json({success: false,error: "Internal Server Error"});
        }
        return res.status(200).json({success: true,message: "OTP Successfully send in your email"});
    }catch(err){
        console.error("Error while send the otp",err);
        return res.status(500).json({success: false,message: "Internal Server Error"});
    }
},
otpsendController.validateOTP=async (req,res)=>{
    console.log("COntroller for Validate the otp");
    try{
        const {OTP,email}=req.body;
        if(!OTP){
            return res.status(400).json({success: false, message: "Please Provide the OTP"});
        }
        const validated=otp.validateotp(email,OTP);
        if(!validated){
            return res.status(422).json({success: false,message: "Your OTP has been Expired Please Regenerate the OTP"});
        }
        return res.status(200).json({success: true, message: "OTP Verified Successfully"});
    }catch(err){
        console.error("Internal Server Error",err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
module.exports=otpsendController;
