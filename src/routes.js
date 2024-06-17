const express=require('express');
const router=express.Router();
const otpsendController=require('./otpSendController');
router.post("/send-otp",otpsendController.sendOTP);
router.post("/validate-otp",otpsendController.validateOTP);
module.exports=router;
