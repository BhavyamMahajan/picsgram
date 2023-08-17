import { PostsIcon } from "../../public/Icons";

export default function SkeletonLoader() {
  return (
    <div className=" w-4/5 m-auto flex flex-col gap-2 px-8 md:w-[90%] md:px-0 shadow">
      <div className="animate-pulse border-b border-zinc-800 pb-8 flex gap-16 md:gap-8 space-x-4">
        <div className="rounded-full bg-zinc-700 w-[150px] h-[150px]"></div>
        <div className="flex-1 space-y-6 py-4">
          <div className="w-[200px] h-2 bg-zinc-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-zinc-700 rounded col-span-2"></div>
              <div className="h-2 bg-zinc-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-zinc-700 rounded"></div>
          </div>
        </div>
      </div>
      <p className="flex items-center self-center gap-1">
        <PostsIcon />
        Posts
      </p>
      <div className="animate-pulse grid grid-cols-3 gap-2 pt-2">
        <div className="min-w-[100px] min-h-[200px] bg-zinc-700"></div>
        <div className="min-w-[100px] min-h-[200px] bg-zinc-700"></div>
        <div className="min-w-[100px] min-h-[200px] bg-zinc-700"></div>
      </div>
    </div>
  );
}
