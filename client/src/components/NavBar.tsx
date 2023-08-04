import Link from "next/link";
import { satisfy } from "@/app/layout";
import { CreatePostIcon, HomeIcon, SearchIcon } from "../../public/Icons";

export default function NavBar() {
  return (
    <div className="w-1/5 h-screen flex flex-col gap-12 py-8  px-4 border-r">
      <h1 className={`${satisfy.className} text-4xl px-3`}>Picsgram</h1>
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="flex gap-4 place-items-center p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
        >
          <HomeIcon />
          Home
        </Link>
        <div className="flex gap-4 p-3 rounded-md hover:bg-white/[.1] hover:transition-all">
          <SearchIcon /> Search
        </div>
        <div className="flex gap-4 p-3 rounded-md hover:bg-white/[.1] hover:transition-all ">
          <CreatePostIcon />
          Post
        </div>
        <Link href="/profile">Profile</Link>
        <div className="w-8 border rounded-full"></div>
      </div>
    </div>
  );
}
