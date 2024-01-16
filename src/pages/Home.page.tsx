import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.component";

function Home() {
  return (
    <>
      <div>
        <NavBar />
        <div className="w-full">
          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
