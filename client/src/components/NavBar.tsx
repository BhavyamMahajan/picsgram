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
    <div className="w-1/5 h-screen flex flex-col gap-20 py-8 px-4 border-r border-zinc-800 sticky top-0">
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
  );
}
