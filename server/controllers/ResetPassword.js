const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt= require("bcrypt");
const crypto=require("crypto");


//resetPasswordToken


exports.resetPasswordToken = async (req,res)=>{
    try{
        // get email from req body
    const email = req.body.email;
    console.log(email);
    // check user for this email, validation email exist
    // const user = await User.findOne({email:email});
		const user = await User.findOne({ email: email });

    console.log("this is user ",user);
    if(!user){
        return res.json({
        success:false,
        message:"Your email is not registered with us",
    })
    }
    // generate token
    // crypto is inbuit 
    const token = crypto.randomUUID()
    // update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
                                            {email:email},
                                            {
                                                token:token,
                                                resetPasswordExpires:Date.now()+ 5*60*1000,
                                            },
                                            {new:true});
    // create url
    
        //this is front end link as on 3000 
        const url = `http://localhost:3000/update-password/${token}`

    // send  mail containing the url
    await mailSender(email,"Password Reset Link",`Password reset Link : ${url}`);

    // return response
    return res.json({
        success:true,
        message:"Email sent Successfully , please check email and change password"
    })

    }catch(error){
        console.log(error);
        return res.json(500).json({
            success:false,
            message:"something went wrong while reset password mail",
        })
    }

}






//resetPassword
exports.resetPassword = async (req,res)=>{

    try{

    
    // data fetch
    const{password,confirmPassword,token}= req.body;
    // validation
    if(password !== confirmPassword){
        return res.json({
            success:false,
            message:'Password not matching',
        })
    }
    //get userDetails from db using token
    const userDetails = await User.findOne({token:token});
    // if no entry --> invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:'token is invalid',
        })
    }
    // token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"token is expired , please regenerate your token",
        })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,10);
    // update the password
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
    );
    // return response
    return res.status(200).json({
        success:true,
        message:"Password reset successfull",
    })
    }catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset pwd mail",
          })  
    }

}