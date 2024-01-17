import { useQuery } from "@tanstack/react-query";
import UserCard from "./UserCard.component";
import { Fragment } from "react";
import { getAllUsers } from "../Endpoints/InternalEndpoints";

function Users() {
  const { isLoading, error, data, isFetched } = useQuery({
    queryKey: ["getallusers"],
    queryFn: async () => getAllUsers(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="space-y-2 w-full max-w-screen-md ">
      {isFetched &&
        data?.users?.map((eachUser: any) => (
          <Fragment key={eachUser._id}>
            <UserCard
              name={eachUser.name}
              email={eachUser.email}
              _id={eachUser._id}
            />
            <div className="broder-t bg-black border"></div>
          </Fragment>
        ))}
    </div>
  );
}

export default Users;
