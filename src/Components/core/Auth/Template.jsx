import React from "react";
import frame from "../../../assets/frame.png"
import SignupForm from "./SignupForm.jsx";
import LoginForm from "./LoginForm.jsx";
import { FcGoogle } from "react-icons/fc";


// import { useSelector } from "react-redux"



 

function Template({ title, desc1, desc2, image, formType }) {
  // const { loading } = useSelector((state) => state.auth)
  return (
    <div className='flex w-11/12 max-w-[1160px] py-8 mx-auto gap-x-12 justify-between '>
      
    <div className='w-full md:w-11/12 md:max-w-[450px]'>
    <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
    <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
      <span className='text-richblack-100'>{desc1}</span>
      <br />
      <span className='text-blue-100 italic'>{desc2}</span>
    </p>

        {formType === "signup" ? <SignupForm /> : <LoginForm />}

        

        
      </div>

     <div className="relative hidden md:block md:w-11/12 md:max-w-[450px] top-[40px]">
    

    <img src={frame}
     alt="Pattern" 
     
     
      loading="lazy" 
      className='h-[447px] w-[588px] hidden md:block'/>
    {/* this image is send by props */}
    <img src={image} alt="Pattern" width={588} 
     height={45} loading="lazy"
    className='absolute -top-4 right-4 h-[446px] w-[437px] hidden md:block'  />
  </div>

          
    </div>
  );
};

export default Template;



