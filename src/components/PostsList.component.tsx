import { Fragment } from "react";
import FeedCard from "./FeedCard.component";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Endpoints/InternalEndpoints";
import convertDateToDays from "../helper";

function PostsList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getallposts"],
    queryFn: async () => getAllPosts(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className={`space-y-10 w-full max-w-screen-md`}>
      <div className="space-y-10 w-full">
        {data?.posts?.length == 0 ? (
          <div className="text-center mt-2">{"No Posts"}</div>
        ) : (
          ""
        )}
        {data?.posts?.map((eachPost: any) => (
          <Fragment key={eachPost._id}>
            <FeedCard
              name={eachPost.userId.name}
              time={convertDateToDays(eachPost.createdAt)}
              content={eachPost.content}
              profile={eachPost.userId.profile}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
