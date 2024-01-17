import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserCard from "./UserCard.component";
import { Fragment } from "react";
import { getAllUsers } from "../Endpoints/InternalEndpoints";

function Users() {
  const queryClient = useQueryClient();
  const refetch = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["getallusers"] });
    }, 200);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["getallusers"],
    queryFn: async () => getAllUsers(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-2 w-full max-w-screen-md ">
      <h1 className="font-bold text-4xl text-slate-800">Users</h1>
      {data?.users?.length == 0 ? (
        <div className="text-center">No Users</div>
      ) : (
        ""
      )}
      {data?.users?.map((eachUser: any) => (
        <Fragment key={eachUser._id}>
          <UserCard
            name={eachUser.name}
            email={eachUser.email}
            _id={eachUser._id}
            currentUserFollowing={eachUser.following}
            currentUserFollowers={eachUser.followers}
            currentUserPosts={eachUser.posts}
            _id_List={data.following}
            refetch={refetch}
            profile={eachUser.profile}
          />
          {/* <div className="broder-t bg-black border"></div> */}
        </Fragment>
      ))}
    </div>
  );
}

export default Users;
