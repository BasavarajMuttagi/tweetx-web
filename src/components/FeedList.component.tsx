import { Fragment, useState } from "react";
import FeedCard from "./FeedCard.component";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../Endpoints/InternalEndpoints";
import NewPostForm from "./NewPostForm.component";
import { useLocation } from "react-router-dom";

function FeedList() {

 const {pathname} =  useLocation()
  const [isShowForm, setIsShowForm] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const closeAfterPost = (isShowForm: boolean) => {
    setIsShowForm(isShowForm);
    setRefetch(!refetch);
  };
  const { isLoading, data } = useQuery({
    queryKey: ["getallposts", refetch],
    queryFn: async () => getAllPosts(),
  });

  if (isLoading) return <div className="font-bold text-2xl">Loading....</div>;

  return (
    <div className={`space-y-10 w-full max-w-screen-md`} >
      <div className={`${pathname !== '/feed' ? "visible":"invisible"}`}>
        <button
          onClick={() => setIsShowForm(!isShowForm)}
          className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-6 text-white md:p-2 md:px-8"
        >
          Write{" "}
        </button>
      </div>

      <div className="space-y-10 w-full">
        {isShowForm && <NewPostForm sendCloseStatus={closeAfterPost} />}
        {data?.posts?.map((eachPost: any) => (
          <Fragment key={eachPost._id}>
            <FeedCard
              name={eachPost.email}
              time={eachPost.email}
              content={eachPost.content}
              postId={eachPost._id}
              isEditable={true}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FeedList;
