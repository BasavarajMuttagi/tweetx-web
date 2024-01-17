import { Outlet } from "react-router-dom";
import Tabs from "./Tabs.component";
import { useQuery } from "@tanstack/react-query";
import { getProfileStats } from "../Endpoints/InternalEndpoints";

function Profile() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["getProfileStats"],
    queryFn: async () => getProfileStats(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="no-scrollbar space-y-10 md:max-w-screen-md">
      <div className="flex items-baseline p-2">
        <div className="w-[30%]">
          <div className="w-28 h-28">
            <img
              src={data?.stats?.profile}
              alt="Movie"
              className="aspect-square rounded-full"
            />
          </div>
        </div>

        <div className="w-screen ml-14">
          <h1 className="font-bold text-4xl text-slate-800">
            {data?.stats?.name}
          </h1>
          <div className="font-medium  text-slate-600 flex  items-baseline space-x-8 space-y-10">
            <div>Posts : {data?.stats?.postsCount}</div>
            <div>Follower : {data?.stats?.followersCount}</div>
            <div>Following : {data?.stats?.followingCount}</div>
          </div>
        </div>
      </div>
      <Tabs />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
