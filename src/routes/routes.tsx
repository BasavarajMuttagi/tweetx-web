import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login.page";
import SignUp from "../pages/SignUp.page";

import FeedList from "../components/FeedList.component";

import Users from "../components/Users.component";

import Profile from "../components/Profile.component";
import FollowingList from "../components/FollowingList.component";
import Home from "../pages/Home.page";
import FollowersList from "../components/FollowersList.component";
import Private from "./Private";
import Public from "./Public";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Private />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "feed",
            element: <FeedList />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "/profile",
            element: <Profile />,
            children: [
              {
                path: "post",
                element: <FeedList />,
              },
              {
                path: "followers",
                element: <FollowersList />,
              },

              {
                path: "following",
                element: <FollowingList />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default routes;

