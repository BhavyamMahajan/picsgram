import Link from "next/link";
import Image from "next/image";
import { satisfy } from "@/app/layout";
import demoImg from "../../public/assets/userdemoimg.png";
import { CreatePostIcon, HomeIcon, SearchIcon } from "../../public/Icons";

const getProfileImg = async (username: string) => {
  const res = await fetch(`http://localhost:5000/profile-img/${username}`);
  const data = await res.json();
  return data.profileImg;
};

export default async function NavBar({ username }: { username: string }) {
  const imgUrl = await getProfileImg(username);

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

        <Link
          href={`/${username}/account-settings`}
          className="flex gap-4 font-semibold mt-auto place-items-center p-3 rounded-md hover:bg-white/[.1] hover:transition-all"
        >
          <Image
            src={imgUrl ? imgUrl : demoImg}
            alt="Profile"
            width={40}
            height={40}
            className="border-2 rounded-full"
          />
          Profile
        </Link>
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
        <Link href={`/${username}/account-settings`}>
          <Image
            src={imgUrl ? imgUrl : demoImg}
            alt="Profile"
            width={30}
            height={30}
            className="border-2 rounded-full"
          />
        </Link>
      </div>
    </>
  );
}
