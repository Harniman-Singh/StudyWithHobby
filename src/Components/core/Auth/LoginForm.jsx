// import React from "react";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";

// const LoginForm = (props) => {
//     const setIsLoggedIn = props.setIsLoggedIn;

//     const navigate = useNavigate();

//     const [showPassword, setShowPassword] = useState(false);

//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     function changeHandler(event) {
//         setFormData([
//             (prev) => [
//                 {
//                     ...prev,
//                     [event.target.name]: event.target.value,
//                 },
//             ],
//         ]);
//     }

//     function submitHandler(e) {
//         e.preventDefault();
//         setIsLoggedIn(true);
//         toast.success("Login Success");
//         navigate("/dashboard");
//     }

//     return (
//         <form
//             onSubmit={submitHandler}
//             className="flex flex-col w-full gap-y-4 mt-6"
//         >
//             <label className="w-full">
//                 <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//                     Email Address
//                     <sup className="text-pink-200">*</sup>
//                 </p>

//                 <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     placeholder="Enter your email address"
//                     onChange={changeHandler}
//                     name="email"
//                     className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//                 />
//             </label>

//             <label className="w-full relative">
//                 <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
//                     Password
//                     <sup className="text-pink-200">*</sup>
//                 </p>

//                 <input
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     placeholder="Enter Password"
//                     onChange={changeHandler}
//                     name="password"
//                     className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//                 />

//                 <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
//                     {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
//                 </span>

//                 <Link to="#">
//                     <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</p>
//                 </Link>
//             </label>

//             <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Sign in</button>
//         </form>
//     );
// };

// export default LoginForm;



// import React, { useState } from 'react'
// // import { Link } from "react-router-dom"
// import {toast} from "react-hot-toast";

// const LoginForm = ({setIsLoggedIn}) => {


//     const navigate=useNavigate();
//     const[formData,setFormData]=useState({
//         email:"",password:""
//     })

//     const[showPassword,setShowPassword]=useState(false);

//     function changeHandler(event){
        
//         setFormData(prevItem=>{
//             return{
//                 ...prevItem,
//                 [event.target.name]:event.target.value
//         }
//         })
//     }

//     function submitHandler(event){
//         event.preventDefault();
        
//         const finalData={
//             ...formData
//         }
//         console.log(finalData);
//         setIsLoggedIn(true);
//         toast.success("logged In");
//         navigate("/dashboard");

//     }
//   return (
//     <form   onSubmit={submitHandler}
//     className="flex flex-col w-full gap-y-4 mt-6 " >

//     <label className="w-full">
//         <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">
//             Email Address
//             <sup className="text-pink-200">*</sup>
//         </p>
//         <input 
//         required
//         type="email" 
//         value={formData.email}
//         onChange={changeHandler}
//         placeholder='Enter email id'
//         name="email"
//         className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
//         />
//     </label>


//     <label className="w-full relative">
//     <p className="text-[1.075rem] text-white mb-1 leading-[1.375rem]">
//                     Password
//                     <sup className="text-pink-200">*</sup>
//                 </p>
//         <input 
//         required
//         type={showPassword?("text"):("password")} 
//         value={formData.password}
//         onChange={changeHandler}
//         placeholder='Enter Password'
//         name="password"
//         className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"/>
    

//     <span 
//      onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
//       {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <   AiOutlineEye fontSize={24} fill='#AFB2BF' />} </span>

//     <Link to="/forgot-password">
//     <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</p>

//     </Link>
//     </label>
//      <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
//         Sign in
//     </button>

//     </form>
//   )
// }

// export default LoginForm
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
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
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
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
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Sign In
      </button>
             <div className="flex w-full items-center my-4 gap-x-2">
          <div className="h-[1px] w-full bg-richblack-700"></div>
          <p className="text-richblack-700 font-medium leading-[1.375rem]">OR</p>
          <div className="h-[1px] w-full bg-richblack-700"></div>
        </div>

            <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
          <FcGoogle />
          <a href="/signup" target="_blank"><p>Sign Up with Google</p></a>
          
        </button>
    </form>
  )
}

export default LoginForm
