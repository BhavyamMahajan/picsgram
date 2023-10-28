import Link from "next/link";
import Image from "next/image";
import demoImg from "../../public/assets/userdemoimg.png";
import { LogoutIcon, SettingsIcon } from "../../public/Icons";

export default async function HeaderProfile({
  username,
}: {
  username: string;
}) {
  const res = await fetch(`http://localhost:5000/profile-img/${username}`);

  let imgUrl = await res.json();
  imgUrl = imgUrl.profileImg;

  return (
    <details className="relative mt-auto">
      <summary className="list-none flex items-center gap-4 font-semibold p-3 md:p-0 rounded-md hover:bg-white/[.1] hover:transition-all cursor-pointer">
        <Image
          src={imgUrl || demoImg}
          alt="Profile"
          width={40}
          height={40}
          className="border-2 rounded-full md:w-[30px] md:h-[30px]"
        />
        <span className="md:hidden">Profile</span>
      </summary>
      <div className="w-full md:w-[140px] absolute top-[-150%] md:top-[-370%] md:left-[-350%] flex flex-col md:bg-white/[.1] md:rounded-md">
        <Link
          href={`/${username}/account-settings`}
          className="flex gap-4 font-semibold p-3 rounded-md hover:bg-white/[.1] hover:transition-all md:border-b md:rounded-none"
        >
          <SettingsIcon />
          Settings
        </Link>
        <Link
          href="/logout"
          className="flex gap-4 font-semibold p-3 px-4 rounded-md hover:bg-white/[.1] hover:transition-all"
        >
          <LogoutIcon />
          Logout
        </Link>
      </div>
    </details>
  );
}
