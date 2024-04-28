// import { FaCheck } from "react-icons/fa"
// import { useSelector } from "react-redux"

// import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
// import CourseInformationForm from "./CourseInformation/CourseInformationForm"
// import PublishCourse from "./PublishCourse"


// export default function RenderSteps() {
//   // from slice
//   const { step } = useSelector((state) => state.course)

//   const steps = [
//     {
//       id: 1,
//       title: "Course Information",
//     },
//     {
//       id: 2,
//       title: "Course Builder",
//     },
//     {
//       id: 3,
//       title: "Publish",
//     },
//   ]

//   return (
//     <>
//       <div className="relative mb-2 flex w-full justify-center">
     
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex flex-col items-center "
//               key={item.id}
//             >
//               <button key={item.id}
//                 className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] 
          
//                 ${step === item.id
//                     ? "border-yellow-50 bg-yellow-900 text-yellow-50"
//                     : "border-richblack-700 bg-richblack-800 text-richblack-300"
//                 } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
//               >
                

//                 {/* for tick  and number*/}
//                 {step > item.id ? ( 
//                   // tick
//                   <FaCheck key={item.id} className="font-bold text-richblack-900" />
//                 )
//                  :(
//                   // number
//                   item.id
//                 )}
//               </button>
              
//             </div>


//             {/* dashes */}
//             {item.id !== steps.length && (
//               <>
//                 <div key={item.id}
//                   className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
//                   step > item.id  ? "border-yellow-50" : "border-richblack-500"
//                 } `}

//                 ></div>
//               </>
//             )}

//           </>
//         ))}
//       </div>



//       {/*  course information course builder publish */}
//       <div className="relative mb-16 flex w-full select-none justify-between">
//         {steps.map((item) => (
//           <>
//             <div
//               className="flex min-w-[130px] flex-col items-center gap-y-2"
//               key={item.id}
//             >
              
//               <p key={item.id}
//                 className={`text-sm ${
//                   step >= item.id ? "text-richblack-5" : "text-richblack-500"
//                 }`}
//               >
//                 {item.title}
//               </p>
//             </div>
            
//           </>
//         ))}
//       </div>

//       {/* form  */}

//       {/* Render specific component based on current step */}
//        {step === 1 && <CourseInformationForm />}
//       {step === 2 && <CourseBuilderForm />}
//       {/* {step === 3 &&  <PublishCourse /> }   */}
//     </>
//   )
// }






import { FaCheck } from "react-icons/fa"
import { useSelector } from "react-redux"

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import PublishCourse from "./PublishCourse"


export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ]

  return (
    <>
      <div className=" mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <div key={item.id} className="w-full relative">
            <div
              className="flex flex-col items-center  "
              key={item.id}
            >
              <button
                className={`grid absolute  cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <>
                <div    key={item.id}
                  className={`h-[calc(34px/2)] left-[7.5rem] w-[75%] absolute border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </>
            )}
          </div>
        ))}
      </div>



      <div className=" relative  top-7  mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div  key={item.id} className="w-full  ">
            <div    key={item.id}
              className="flex min-w-[130px] flex-col items-center gap-y-2"
            
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </div>
        ))}
      </div>
      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 &&  <PublishCourse /> }
    </>
  )
}