// import React from "react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const SignupForm = (props) => {
//   const setIsLoggedIn = props.setIsLoggedIn;

//   const navigate = useNavigate();

//   const [showCreatePass, setShowCreatePass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const [accountType, setAccountType] = useState("student");

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   function changeHandler(event) {
//     setFormData([
//       (prev) => [
//         {
//           ...prev,
//           [event.target.name]: event.target.value,
//         },
//       ],
//     ]);
//   }

//   function submitHandler(e) {
//     e.preventDefault();
//     if (formData.password != formData.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     setIsLoggedIn(true);
//     toast.success("Account Create");
//     const accountData = {
//       ...formData,
//     };
//     console.log(accountData);

//     navigate("/dashboard");
//   }

//   return (
//     <div>
//       <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max">
//         <button
//           onclick={() => setAccountType("student")}
//           className={`${
//             accountType === "student"
//               ? "bg-richblack-900 text-richblack-5"
//               : "bg-transparent text-richblack-200 "
//           } py-2 px-5 rounded-full transition-all`}
//         >
//           Student
//         </button>
//         <button
//           onclick={() => setAccountType("instructor")}
//           className={`${
//             accountType === "instructor"
//               ? "bg-richblack-900 text-richblack-5"
//               : "bg-transparent text-richblack-200 "
//           } py-2 px-5 rounded-full transition-all`}
//         >
//           Instructor
//         </button>
//       </div>

//       <form onSubmit={submitHandler}>
//         <div className="flex gap-x-3">
//           <label htmlFor="" className="w-full">
//             <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//               First Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               type="text"
//               required
//               placeholder="Enter First Name"
//               onChange={changeHandler}
//               value={FormData.firstName}
//               name="firstName"
//               className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//             />
//           </label>

//           <label htmlFor="" className="w-full">
//             <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//               Last Name <sup className="text-pink-200">*</sup>
//             </p>
//             <input
//               type="text"
//               required
//               placeholder="Enter Last Name"
//               onChange={changeHandler}
//               value={FormData.lastName}
//               name="lastName"
//               className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//             />
//           </label>
//         </div>

//         <label htmlFor="" className="w-full">
//           <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//             Email Address
//             <sup className="text-pink-200">*</sup>
//           </p>

//           <input
//             type="email"
//             required
//             placeholder="Enter your email address"
//             value={formData.email}
//             onChange={changeHandler}
//             className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//             name="email"
//           />
//         </label>

//         <div className="flex gap-x-3">
//           <label htmlFor="w-full relative">
//             <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//               Create Password
//               <sup className="text-pink-200">*</sup>
//             </p>

//             <input
//               type={showCreatePass ? "text" : "password"}
//               required
//               placeholder="Enter Password"
//               onChange={changeHandler}
//               value={formData.password}
//               name="password"
//               className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//             />
//             <span
//               onClick={() => setShowCreatePass(!showCreatePass)}
//               className="absolute right-3 top-[38px] cursor-pointer z-10"
//             >
//               {showCreatePass ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>

//           <label htmlFor="" className="w-full relative">
//             <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//               Confirm Password
//               <sup className="text-pink-200">*</sup>
//             </p>

//             <input
//               type={showConfirmPass ? "text" : "password"}
//               required
//               placeholder="Confirm Password"
//               onChange={changeHandler}
//               value={formData.confirmPassword}
//               name="confirmPassword"
//               className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//             />

//             <span
//               onClick={() => setShowConfirmPass(!showConfirmPass)}
//               className="absolute right-3 top-[38px] cursor-pointer z-10"
//             >
//               {showConfirmPass ? (
//                 <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//               ) : (
//                 <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//               )}
//             </span>
//           </label>
//         </div>

//         <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-4 font-medium text-richblack-900 w-full">
//           Create Account
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;



// import React, { useState } from 'react'
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const SignupForm = ({setIsLoggedIn}) => {

//   const navigate=useNavigate();
//   const[formData,setFormData]=useState({
//     firstname:"",lastname:"",email:"",password:"",confirmPassword:""
//   })


//   // const[showPassword,setShowPassword]=useState(false);
//   const [showCreatePass, setShowCreatePass] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const[accountType,setAccountType]=useState("student");

//   function changeHandler(event){
        
//     setFormData(prevItem=>{
//         return{
//             ...prevItem,
//             [event.target.name]:event.target.value
//     }
//     })
//   } 

//   function submitHandler(event){
//     event.preventDefault();
//     if(formData.password!==formData.confirmPassword){
//       toast.error("Password Do not match");
//       return;
//     }
//     setIsLoggedIn(true);
//     toast.success("Account Created");
    
//     const accountData={
//       ...formData
//     }

//     const finalData={
//       ...accountData,
//       accountType
//     }
//     console.log(finalData);

//     navigate("/dashboard");
//   }
//   return (
//     <div>
//       {/* student-instructor tab phele */}

//       <div
//       className="flex bg-richblack-800 p-1 gap-x-1 my-2 rounded-full max-w-max">
//         <button
//         className={`${accountType==="student"?
//         "bg-richblack-900 text-richblack-5":
//         "bg-trasparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
//         onClick={()=>setAccountType("student")}>
//           Student
//         </button>
//         <button
//           className={`${accountType==="instructor"?
//           "bg-richblack-900 text-richblack-5" :
//           "bg-trasparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
   
//         onClick={()=>setAccountType("instructor")}>
        
//           Instructor
//         </button>
//       </div>


//       <form  onSubmit={submitHandler}>
//         {/* first and last name */}
//         <div className="flex justify-between mt-2 mb-2">
//           <label >
//             <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">First Name<sup className="text-pink-200">*</sup></p>
//             <input   className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"

//             required
//             type="text"
//             name="firstname"
//             onChange={changeHandler}
//             placeholder='Enter First Name'
//             value={formData.firstname} />
//           </label>
//           <label >
//             <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">Last Name<sup className="text-pink-200">*</sup></p>
//             <input   className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"

//             required
//             type="text"
//             name="lastname"
//             onChange={changeHandler}
//             placeholder='Enter Last Name'
//             value={formData.lastname} />
//           </label>
//         </div>

//        {/* email Address */}
//         <label className="w-full mt-4">
//             <p className="text-[1.075rem] text-white mb-[0.5px] leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
//             <input   className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"

//             required
//             type="email"
//             name="email"
//             onChange={changeHandler}
//             placeholder='Enter Emial Addres'
//             value={formData.email} />
//           </label>

//         {/* password */}
//         <div className="flex justify-between w-full mt-4">
//         <label className="relative">
//             <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">Create Password<sup className="text-pink-200">*</sup></p>
//             <input   className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"

//             required
//             type={showCreatePass?("text" ):("password")}
//             name="password"
//             onChange={changeHandler}
//             placeholder='Enter Password'
//             value={formData.password} />
//           <span onClick={() => setShowCreatePass(!showCreatePass)} className="absolute right-3 top-[38px] cursor-pointer ">
//       {showCreatePass ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}    </span>
//           </label>

//         <label className="relative">
//             <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">Confirm Password<sup className="text-pink-200">*</sup></p>
//             <input
//                className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"

//             required
//             type={showConfirmPass?("text" ):("password")}
//             name="confirmPassword"
//             onChange={changeHandler}
//             placeholder='Confirm Password'
//             value={formData.confirmPassword} />
//           <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-3 top-[38px] cursor-pointer ">
//       {showConfirmPass ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}                 </span>
//           </label>

//         </div>


//         <button className="bg-yellow-50 w-full  py-[8px] px-[12px] rounded-[8px] mt-3 font-medium text-richblack-900">

//       Create Account
//      </button>
//       </form>
//     </div>
//   )
// }

// export default SignupForm









import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
      {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
