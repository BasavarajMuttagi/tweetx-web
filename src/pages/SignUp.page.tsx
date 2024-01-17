import artWork from "../assets/Log in.png";
import SignUpForm from "../components/SignUpForm.component";

function SignUp() {
  return (
    <div className="md:w-full md:flex md:justify-between md:h-screen">
      <div className="md:w-[40%]">
        <SignUpForm />
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

export default SignUp;
