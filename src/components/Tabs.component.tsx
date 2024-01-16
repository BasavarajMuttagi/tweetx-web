import { BsPostcardHeart } from "react-icons/bs";
import { BsPostcard } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
function Tabs() {
  return (
    <div className="mt-10 w-full">
      <ul className="flex border-t-2 justify-center">
        <li>
          <NavLink
            to="/profile/post"
            className={({ isActive }) =>
              isActive
                ? "px-8 border-t-[3px] border-slate-600"
                : "px-8 border-t-[3px] border-white  hover:border-t-[3px] hover:border-slate-400"
            }
          >
            <span className="inline-flex items-center space-x-2">
              <BsPostcard />
              <p>Post</p>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/followers"
            className={({ isActive }) =>
              isActive
                ? "px-8 border-t-[3px] border-slate-600"
                : "px-8 border-t-[3px] border-white  hover:border-t-[3px] hover:border-slate-400"
            }
          >
            <span className="inline-flex items-center space-x-2">
              <MdPostAdd />
              <p>Followers</p>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/following"
            className={({ isActive }) =>
              isActive
                ? "px-8 border-t-[3px] border-slate-600"
                : "px-8 border-t-[3px] border-white  hover:border-t-[3px] hover:border-slate-400"
            }
          >
            <span className="inline-flex items-center space-x-2">
              <BsPostcardHeart />
              <p>Following</p>
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;
// border-t-[3px] border-slate-600
