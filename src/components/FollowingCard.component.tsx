function FollowingCard({ name}: any) {
  return (
    <div className="rounded p-3 flex items-center max-w-screen-md">
      <div>
        <div className="w-20 h-20">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
            className="aspect-square rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between items-baseline w-full">
        <div className="space-y-2 p-4">
          <h1 className="font-bold text-2xl">{name}</h1>
          <h3 className="text-xs font-medium text-slate-500">Following {800}</h3>
        </div>
        <button className=" h-fit relative p-2 font-semibold  rounded-md px-6 text-slate-800 md:p-2 md:px-8">
          Following
        </button>
      </div>
    </div>
  );
}

export default FollowingCard;
