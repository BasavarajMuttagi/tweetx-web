import { NavLink, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import useTweetXStore from "../store";
function NavBar() {
  const { setToken } = useTweetXStore();
  const naviagte = useNavigate();
  const logout = () => {
    setToken("");
    naviagte("/login");
  };
  return (
    <nav className="p-6 bg- drop-shadow-lg h-20 bg-[#f9f9f9] flex justify-between z-[999]">
      <div className="w-[50%]">
        <h1 className="text-[#ff748d]  font-semibold text-3xl md:text-4xl">
          TweetX
        </h1>
      </div>
      <div className="relative dropdown">
        <ul className="invisible md:flex justify-center p-2 space-x-16 font-semibold md:visible">
          <li className="hover: hover:cursor-pointer">
            <NavLink
              to="/feed"
              className={({ isActive }) => (isActive ? "text-[#ff748d]" : "")}
            >
              Feed
            </NavLink>
          </li>
          <li className="hover:text-[#ff748d] hover:cursor-pointer">
            <NavLink
              to="/users"
              className={({ isActive }) => (isActive ? "text-[#ff748d]" : "")}
            >
              Users
            </NavLink>
          </li>
          <li className="hover:text-[#ff748d] hover:cursor-pointer">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "text-[#ff748d]" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li className="hover:text-[#ff748d] hover:cursor-pointer">
            <button onClick={() => logout()}>Logout</button>
          </li>
        </ul>
        <div tabIndex={0} role="button">
          <RxHamburgerMenu className="absolute scale-[250%] top-[30%] left-[80%] md:invisible" />
        </div>

        {/* <ul
          tabIndex={0}
          className="dropdown-content z-[999] menu  shadow bg-black rounded-box  text-white absolute top-12 -left-0  w-fit text-lg"
        >
          <li className="p-2"> 
            <NavLink to={"/feed"}>Feed</NavLink>
          </li>
          <li className="p-2">
            <NavLink to={"/users"}>Users</NavLink>
          </li>
          <li className="p-2">
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
        </ul> */}
      </div>
    </nav>
  );
}

export default NavBar;
