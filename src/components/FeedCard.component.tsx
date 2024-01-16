function FeedCard({ name, time, content ,postId,isEditable}: any) {
  return (
    <div className="max-w-screen-md drop-shadow-lg bg-[#f9f9f9] rounded-3xl p-5 flex items-baseline">
      <div>
        <div className="w-20 h-20">
          <img
            src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
            className="aspect-square rounded-full"
          />
        </div>
      </div>
      <div className="p-4 space-y-5 w-full">
        <div className="w-[100%] flex items-baseline justify-between">
          <h1 className="font-bold text-2xl">{name}</h1>
          <div className="text-slate-800">{time}</div>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default FeedCard;
