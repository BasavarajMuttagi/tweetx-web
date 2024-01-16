import artWork from "../assets/Log in.png";
import LoginForm from "../components/LoginForm.component";
function Login() {
  return (
    <div className="overflow-hidden md:w-full md:flex md:justify-between md:h-screen">
      <div className="md:w-[40%]">
        <LoginForm />
      </div>
      <div className="h-0 invisible md:w-[50%] md:visible md:h-[100%]">
        <img
          src={artWork}
          alt="Login-ArtWork"
          className=" h-[80%] scale-x-150 "
        />
      </div>
    </div>
  );
}

export default Login;
