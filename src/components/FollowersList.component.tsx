import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { getAllfollowers } from "../Endpoints/InternalEndpoints";
import UserCard from "./UserCard.component";

function FollowersList() {
  const queryClient = useQueryClient();
  const refetch = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["getAllfollowers"] });
    }, 200);
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllfollowers"],
    queryFn: async () => getAllfollowers(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="space-y-2 w-full max-w-screen-md ">
      {data?.followers?.length == 0 ? (
        <div className="text-center">No Followers</div>
      ) : (
        ""
      )}
      {data?.followers?.map((eachUser: any) => (
        <Fragment key={eachUser._id}>
          <UserCard
            name={eachUser.name}
            email={eachUser.email}
            _id={eachUser._id}
            refetch={refetch}
            currentUserFollowing={eachUser.following}
            currentUserFollowers={eachUser.followers}
            currentUserPosts={eachUser.posts}
            _id_List={data.following}
            profile={eachUser.profile}
          />
          <div className="broder-t bg-black border"></div>
        </Fragment>
      ))}
    </div>
  );
}

export default FollowersList;
