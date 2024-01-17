import { Fragment, useState } from "react";
import FeedCard from "./FeedCard.component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPosts } from "../Endpoints/InternalEndpoints";
import NewPostForm from "./NewPostForm.component";
import { useLocation } from "react-router-dom";
import convertDateToDays from "../helper";

function FeedList() {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [isShowForm, setIsShowForm] = useState(false);
  const closeAfterPost = (isShowForm: boolean) => {
    setIsShowForm(isShowForm);
    queryClient.invalidateQueries({ queryKey: ["getallposts"] });
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ["getallposts"],
    queryFn: async () => getAllPosts(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;
  if (error) return "An error has occurred: " + error.message;
  return (
    <div className={`space-y-10 w-full max-w-screen-md`}>
      <div className={`${pathname !== "/feed" ? "visible" : "invisible"}`}>
        <button
          onClick={() => setIsShowForm(!isShowForm)}
          className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-6 text-white md:p-2 md:px-8"
        >
          Write{" "}
        </button>
      </div>

      <div className="space-y-10 w-full">
        {isShowForm && <NewPostForm sendCloseStatus={closeAfterPost} />}
        {data?.posts?.length == 0 ? (
          <div className="text-center mt-2">
            {pathname == "/feed" ? "No Feed" : "No Posts"}
          </div>
        ) : (
          ""
        )}
        {data?.posts?.map((eachPost: any) => (
          <Fragment key={eachPost._id}>
            <FeedCard
              name={eachPost.userId.name}
              time={convertDateToDays(eachPost.createdAt)}
              content={eachPost.content}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FeedList;
