import Link from "next/link";
import Image from "next/image";
import { satisfy } from "@/app/layout";
import demoImg from "../../public/assets/userdemoimg.png";
import { CreatePostIcon, HomeIcon, SearchIcon } from "../../public/Icons";

export default function NavBar({ username }: { username: string }) {
  return (
    <div className="w-1/5 h-screen flex flex-col gap-20 py-8 px-4 border-r border-zinc-800">
      <h1 className={`${satisfy.className} text-4xl px-3`}>Picsgram</h1>
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="flex gap-4 place-items-center font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
        >
          <HomeIcon />
          Home
        </Link>
        <div className="flex gap-4 font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all">
          <SearchIcon /> Search
        </div>
        <Link
          href={`/${username}/create-post`}
          className="flex gap-4 font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all "
        >
          <CreatePostIcon />
          Post
        </Link>
      </div>

      <Link
        href={`/${username}/account-settings`}
        className="flex gap-4 font-semibold mt-auto place-items-center p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
      >
        <Image
          src={demoImg}
          alt="Profile"
          width={40}
          height={40}
          className="border-2 rounded-full"
        />
        Profile
      </Link>
    </div>
  );
}
