import { Fragment } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllfollowing } from "../Endpoints/InternalEndpoints";
import FollowingCard from "./FollowingCard.component";

function FollowingList() {
  const queryClient = useQueryClient();
  const refetch = () => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["getallfollowing"] });
    }, 200);
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["getallfollowing"],
    retry: 1000,
    queryFn: async () => getAllfollowing(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-2 max-w-screen-md">
      {data?.following?.map((eachUser: any) => (
        <Fragment key={eachUser._id}>
          <FollowingCard
            name={eachUser.name}
            email={eachUser.email}
            _id={eachUser._id}
            refetch={refetch}
          />
          <div className="broder-t bg-black border"></div>
        </Fragment>
      ))}
    </div>
  );
}

export default FollowingList;
