import Image from "next/image";
import demo from "../../../../public/assets/userdemoimg.png";
import Link from "next/link";
import { EditIcon } from "../../../../public/Icons";

export default function page({ params }: { params: { username: string } }) {
  const { username } = params;

  return (
    <div className="w-4/5 m-auto flex gap-20 border-b border-zinc-800 pb-8 px-8">
      <Image
        src={demo}
        alt="Profile"
        width={150}
        height={150}
        className="rounded-full"
      />
      <div className="flex flex-col gap-2 w-3/5">
        <p className="text-xl">{username}</p>
        <p>Name</p>
        <p>Bio</p>
        <div className="mt-auto flex justify-end">
          <Link
            href={`/${username}/account-settings/edit`}
            className="bg-[rgb(54,54,54)] hover:bg-[rgb(38,38,38)] transition-all flex place-items-center gap-2 py-1 px-2 rounded"
          >
            <EditIcon />
            Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
}
