import { Navigate, Outlet } from "react-router-dom";
import useTweetXStore from "../store";

function Private() {
  const { token } = useTweetXStore();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Private;
