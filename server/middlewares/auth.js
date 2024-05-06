// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const User = require("../models/User");

// // auth
// exports.auth=async(req,res, next)=>{
//     try{
//         // extract token
//         console.log("enterting the auth section");
//         const token = req.cookies.token|| req.body.token|| req.header("Authorisation").replace("Bearer ","");
//         // if token missing return response
//         if(!token){
//             return res.status(401).json({
//                 success:false,
//                 message:'Token is missing',
//             })
//         }

//         console.log("token verification in middleware")
//         // verify the token
//         try{
            
//             console.log("verify done")
//             const decode = await jwt.verify(token, process.env.JWT_SECRET);

//             console.log("decode At Auth middleware",decode);
//             req.user=decode;
//         }catch(error){
//             // verification - issuse
//             return res.status(401).json({
//                 success:false,
//                 message:'token is invalid',
//             })
//         }
//         console.log("verification is done") 
//         next();

//     }catch(error){
//         return res.status(401).json({
//             success:false,
//             message:"Something went wrong while validating the token",

//         })
//     }
// }
// //isStudent

// exports.isStudent=async(req,res,next)=>{
//     try{
//         if(req.user.accountType!=="Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is protected route for Student only",
//             })
//         }
//         next();
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         })
//     }
// }

// //isInstructor
// exports.isInstructor=async(req,res,next)=>{
//     try{
//         console.log("yes it is instructor");
//         if(req.user.accountType!=="Instructor"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is protected route for Instructor only",
//             })
//         }
//         next();
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         })
//     }
// }
// //isAdmin

// exports.isAdmin=async(req,res,next)=>{
//     try{
//         console.log("checking for admin route");
//         if(req.user.accountType!=="Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"This is protected route for Admin only",
//             })
//         }
//         console.log("You are good for admin route")
//         next();
//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"User role cannot be verified, please try again",
//         })
//     }
// }






// Importing required modules
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// Configuring dotenv to load environment variables from .env file
dotenv.config();

// This function is used as middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
        // console.log("getting the token");
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorisation").replace("Bearer ", "");

        console.log("auth wala token",token);

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}
        // console.log("entering try block");
		try {
			// Verifying the JWT using the secret key stored in environment variables
            // console.log("verifying the decode token");
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		// console.log(userDetails);

		// console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
