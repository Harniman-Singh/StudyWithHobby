
const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config();

//sendOTP
exports.sendotp=async(req,res)=>{

    try{

   
    //fetch email from request ki body
    const {email}=req.body;
    // check if user already exist
    const checkUserPresent=await User.findOne({email});

    // if user already exist, then return a response
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered",
        })
    }


    // generate otp  not optimistic  code we will use a special package unique otp in company
    var otp =otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })
    console.log("OTP Generated:",otp);

    //check unique otp or not

  
  
    
    let result = await OTP.findOne({otp:otp});
    console.log("Result is Generate OTP Func")
    console.log("OTP", otp)
      console.log("Result", result)
    while(result){
        otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        
        console.log("hobby");
    }

    console.log("hobby");



    
    const otpPayload={email,otp};
    // creating entry in database
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    console.log("hobby2");

    res.status(200).json({
        success:true,
        message:"OTP Sent Successfully",
        otp,
    })



}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message,

    })
}
}




// signup
exports.signup=async (req,res)=>{

    
    try{


    // data fetch form request ki body
    const {firstName,lastName,email,password,
        confirmPassword,accountType,contactNumber,otp}=req.body;

    
    // validate krlo 
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required",
        })
    }
    console.log("validate karliya");
    // 2 password match karlo
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirmPassword value does not match, please try again",
        })
    }
    // check user already exist or not 
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"user is already registered",
        });
    }
    console.log("check exiting");

    // find most recent OTP stored for the user
    // const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1)
    const recentOtp =  await OTP.find({email}).sort({createdAt:-1}).limit(1);
    // const recentOtp = await OTP.find({otp:otp})  // ede nal chal gayay
    console.log("recent Otp",recentOtp);

    console.log("recent otp find");
    // validate otp
    if(recentOtp.length===0){
        // OTP not found
        return res.status(400).json({
            success:false,
            message:"OTP not found",
        })
    }else if(otp !== recentOtp[0].otp){
        // invalid OTP
        return res.status(400).json({
            success:false,
            message:"Invalid OTP",
        })
    }

    // const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    // console.log(response)
    // if (response.length === 0) {
    //   // OTP not found for the email
    //   return res.status(400).json({
    //     success: false,
    //     message: "The OTP is not valid",
    //   })
    // } else if (otp !== response[0].otp) {
    //   // Invalid OTP
    //   return res.status(400).json({
    //     success: false,
    //     message: "The OTP is not valid",
    //   })
   
    // hash password
    console.log("password hashing");

    const hashedPassword = await bcrypt.hash(password,10);
     // Create the user
     let approved = ""
     approved === "Instructor" ? (approved = false) : (approved = true)
 
     // create the additional Profile for User
    // entry create in DB

    const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,

    });

    console.log("creating user")
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        // third party service diceBear for logo as first and last name
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })

    // return res

    console.log("user created");
    return res.status(200).json({
        success:true,
        message:"User is registered Successfully",
        user,
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again",
        })
    }

}

// login

exports.login= async (req,res)=>{
    try{
        // get data from req body
        const {email,password}=req.body;
        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            })
        }
        // user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first",
            })
        }

        // generate JWT, after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            })
            user.token=token;
            user.password=undefined;
            console.log("creating cookie for auth")
            // create cookie send response
            const Options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,Options).status(200).json({
                success:true,
                token,
                user,
                message:"logged In successfully",
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'password is incorrect',
            })
        }


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again"
        })
    }
}

// changePassword
// Home work
// exports.changePassword = async(req,res)=>{
//     // get data from req body
//     // get oldPassword, newPassword,confirmPassword
//     // validation

//     // update pwd in db
//     // send mail- Passwordupdated
//     // return response
// }



// Controller for Changing Password
exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
  }



 