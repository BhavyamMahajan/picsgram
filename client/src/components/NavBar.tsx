import Link from "next/link";
import { satisfy } from "@/app/layout";
import HeaderProfile from "./HeaderProfile";
import { CreatePostIcon, HomeIcon, SearchIcon } from "../../public/Icons";

export default async function NavBar({ username }: { username: string }) {
  return (
    <>
      <div className="w-1/5 h-screen flex flex-col gap-20 py-8 px-4 border-r border-zinc-800 sticky top-0 md:hidden">
        <h1 className={`${satisfy.className} text-4xl px-3`}>Picsgram</h1>
        <div className="flex flex-col gap-1">
          <Link
            href={`/${username}`}
            className="flex gap-4 items-center font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
          >
            <HomeIcon />
            Home
          </Link>
          <Link
            href={`/${username}/search`}
            className="flex items-center gap-4 font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
          >
            <SearchIcon /> Search
          </Link>
          <Link
            href={`/${username}/create-post`}
            className="flex gap-4 font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all "
          >
            <CreatePostIcon />
            Post
          </Link>
        </div>

        <HeaderProfile username={username} />
      </div>
      <div className="hidden md:w-full md:fixed md:bottom-0 md:bg-black md:px-6 md:py-2 md:flex md:items-center md:justify-between border-t border-zinc-400">
        <Link href={`/${username}`}>
          <HomeIcon />
        </Link>
        <Link href={`/${username}/search`}>
          <SearchIcon />
        </Link>
        <Link href={`/${username}/create-post`}>
          <CreatePostIcon />
        </Link>
        <HeaderProfile username={username} />
      </div>
    </>
  );
}
