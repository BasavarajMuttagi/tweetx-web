import { Fragment, useState } from "react";
import FeedCard from "./FeedCard.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import convertDateToDays from "../helper";
import { getFeed } from "../Endpoints/InternalEndpoints";
import NewPostForm from "./NewPostForm.component";

function FeedList() {
  const queryClient = useQueryClient();
  const [isShowForm, setIsShowForm] = useState(false);
  const closeAfterPost = (isShowForm: boolean) => {
    console.log("New Feed");
    setIsShowForm(isShowForm);
    queryClient.invalidateQueries({ queryKey: ["getFeed"] });
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["getFeed"],
    queryFn: async () => getFeed(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className={`space-y-10 w-full max-w-screen-md`}>
      <h1 className="font-bold text-4xl text-slate-800">Feed</h1>

      <button
        onClick={() => setIsShowForm(!isShowForm)}
        className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-6 text-white md:p-2 md:px-8"
      >
        Write{" "}
      </button>
      <div className="space-y-10 w-full mt-1">
        {isShowForm && <NewPostForm sendCloseStatus={closeAfterPost} />}
        {data?.feed?.length == 0 ? (
          <div className="text-center mt-2">No Feed</div>
        ) : (
          ""
        )}
        {data?.feed?.map((eachPost: any) => (
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

export default FeedList;
