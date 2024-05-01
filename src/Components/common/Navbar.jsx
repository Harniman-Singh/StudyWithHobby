// import React from "react";
// import logo from "../assets/Logo.svg";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";

// const Navbar = (props) => {
//   const isLoggedIn = props.isLoggedIn;
//   const setIsLoggedIn = props.setIsLoggedIn;
//   return (
//     <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
//       <Link to="/">
//         <img src={logo} height={32} width={160} loading="lazy" />
//       </Link>

//       <nav>
//         <ul className="flex gap-x-6 text-richblack-100">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/">About</Link>
//           </li>
//           <li>
//             <Link to="/">Contact</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Button - Login = Signup = Logout = Dashboard  */}

//       <div className="flex items-center gap-x-4 text-richblack-100">
//         {!isLoggedIn && (
//           <Link to="/login">
//             <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//               Login
//             </button>
//           </Link>
//         )}
//         {!isLoggedIn && (
//           <Link to="/signup">
//             <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//               Sign Up
//             </button>
//           </Link>
//         )}
//         {isLoggedIn && (
//           <Link to="/">
//             <button
//               onClick={() => {
//                 setIsLoggedIn(false);
//                 toast.success("Logout Sucessfully");
//               }}
//               className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700"
//             >
//               Log Out
//             </button>
//           </Link>
//         )}
//         {isLoggedIn && (
//           <Link to="/dashboard">
//             <button className="bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
//               Dashboard
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import './Navbar.css'

import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/logo2.png";
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)


  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log(res.data);
        setSubLinks(res.data.allCategories);
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex  
      hobby 
      justify-evenly item-center  max-w-full py-4 mx-auto'>
       ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
     
     <Link to="/">
        <img src={logo} alt="logo"  width={160} height={32} loading='lazy' className="rounded-md hidden md:block" />
      </Link>
        {/* Navigation links */}
        <nav>
        <ul className='flex gap-x-6  text-white text-[25px] '>

            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              // ?.filter(
                              //   (subLink) => subLink?.courses?.length > 0
                              // )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>


        {/* Login / Signup / Dashboard */}

        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-white" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-white">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-white">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

      </div>
   
  )
}

export default Navbar
