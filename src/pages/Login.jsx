// import Template from "../Components/core/Auth/Template";
import Template from "../Components/core/Auth/Template"
import loginImg from "../assets/login1.jpeg";

function Login() {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      // setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default Login;
