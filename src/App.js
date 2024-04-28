import "./App.css";
import Navbar from "./Components/common/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import { Route, Routes } from "react-router-dom";
// import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OpenRoute from "./Components/core/Auth/OpenRoute"
import About from "./pages/About"
import Contact from "./pages/Contact";
import UpdatePassword from './pages/UpdatePassword'
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./Components/core/Dashboard/MyProfile"
import Error from "./pages/Error"
import Setting from './Components/core/Dashboard/Settings/index'

import { ACCOUNT_TYPE } from "./utils/constants";

import EnrolledCourses from './Components/core/Dashboard/EnrolledCourses'
import Cart from './Components/core/Dashboard/Cart'
import AddCourse from "./Components/core/Dashboard/AddCourse";
import MyCourses from "./Components/core/Dashboard/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog"
import CourseDetails from './pages/CourseDetails'
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourse";
import Instructor from "./Components/core/Dashboard/InstructorDashboard/Instructor";


function App() {
  // const razorpayid=process.env.REACT_APP_RAZOR_I;
  // console.log(razorpayid);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // return (
  //   <div className="w-screen h-screen bg-richblack-900 flex flex-col ">
  //     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route
  //         path="/login"
  //         element={<Login setIsLoggedIn={setIsLoggedIn} />}
  //       />
  //       <Route
  //         path="/signup"
  //         element={<Signup setIsLoggedIn={setIsLoggedIn} />}
  //       />
  //       <PrivateRoute isLoggedIn={isLoggedIn}>
  //         <Route path="/dashboard" element={<Dashboard />} />
  //       </PrivateRoute>
  //     </Routes>
  //   </div>
  // );


  const { user } = useSelector((state) => state.profile)


  return(
    <div  className="w-screen min-h-screen bg-richblack-900 flex-col">
    <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails  />} />
      
      <Route path="/login" element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      }>
      </Route>
      
      <Route path="/signup" element={
      <OpenRoute>
        <Signup />
          </OpenRoute>}>
      </Route>

      <Route path="/forgot-password" element={
      <OpenRoute>
        <ForgotPassword />
          </OpenRoute>}>
      </Route>

      <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />  
      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />  

      <Route
          path="/about"
          element={
              <About />
          }
        />
    <Route path="/contact" element={<Contact />} />

      <Route element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
      }
      >
        <Route path="dashboard/my-profile" element={<MyProfile/>}></Route>

        {/* setting function is defined in setting folder index.jsx  */}
        <Route path="dashboard/settings" element={<Setting/>}></Route>

        {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }
        {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          
          </>
        )
      }


        </Route>



        <Route element={
          <PrivateRoute>
            <ViewCourse></ViewCourse>
          </PrivateRoute>
        }>

          {
            user?.accountType=== ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              ></Route>
              </>
            )
          }

        </Route>

          <Route path="*" element={<Error />} />
    </Routes>
  </div>
  )
}

export default App;
