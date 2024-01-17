import { followAUser, unfollowAUser } from "../Endpoints/InternalEndpoints";

function FollowingCard({
  name,
  _id,
  _id_List = [],
  refetch,
  currentUserFollowing = [],
  currentUserFollowers = [],
  currentUserPosts = [],
  profile
}: any) {
  return (
    <div className="rounded p-3 flex items-center max-w-screen-md">
      <div>
        <div className="w-20 h-20">
          <img
            src={profile}
            alt="Movie"
            className="aspect-square rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between items-baseline w-full">
        <div className="space-y-2 p-4">
          <h1 className="font-bold text-2xl">{name}</h1>
          <h3 className="text-xs  text-slate-500 font-bold flex space-x-5">
            <div>
              {currentUserPosts?.length} <span>Posts</span>
            </div>{" "}
            <div>
              {currentUserFollowers?.length} <span>followers</span>
            </div>{" "}
            <div>
              {currentUserFollowing?.length} <span>following</span>
            </div>
          </h3>
        </div>
        {/* <button
          onClick={async () => {
            unfollowAUser({ userIdToBeUnFollowed: _id }), refetch();
          }}
          className=" h-fit relative p-2 font-semibold  rounded-md px-6 text-slate-800 md:p-2 md:px-8"
        >
          Following
        </button> */}
        {_id_List.includes(_id) ? (
          <button
            onClick={async () => {
              followAUser({ userIdToBeFollowed: _id }), refetch();
            }}
            className=" h-fit relative p-2 font-semibold bg-[#ff748d] rounded-md px-6 text-white md:p-2 md:px-8"
          >
            Follow
          </button>
        ) : (
          <button
            onClick={async () => {
              unfollowAUser({ userIdToBeUnFollowed: _id }), refetch();
            }}
            className=" h-fit relative p-2 font-semibold  rounded-md px-6 text-slate-800 md:p-2 md:px-8"
          >
            Following
          </button>
        )}
      </div>
    </div>
  );
}

export default FollowingCard;
