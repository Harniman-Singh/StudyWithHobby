import Template from "../Components/core/Auth/Template";
// import signupImg from "../assets/signup.png";
import signupImg from "../assets/Images/signup.webp"


function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Join the millions learning for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Signup;
