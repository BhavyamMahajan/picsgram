import Link from "next/link";
import Image from "next/image";
import demo from "../../public/assets/userdemoimg.png";
import { EditIcon, PostsIcon, VerifiedBatch } from "../../public/Icons";

type Props = {
  data: any;
  username: string;
  query?: boolean;
};
export default function ViewProfile({ data, username, query = false }: Props) {
  return (
    <div className="w-4/5 m-auto flex flex-col gap-2 px-8">
      <div className="flex gap-16 border-b border-zinc-800 pb-8">
        <Image
          src={data?.profileImg ? data.profileImg : demo}
          alt={username}
          width={150}
          height={150}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2 w-3/5">
          <p className="flex gap-2 items-center text-xl">
            {username} {data?.isVerified && <VerifiedBatch />}
          </p>
          <p className="capitalize">{data?.name}</p>
          {data?.bio && <p>{data.bio}</p>}
          {!query && (
            <div className="mt-auto flex justify-end">
              <Link
                href={`/${username}/account-settings/edit`}
                className="bg-[rgb(54,54,54)] hover:bg-[rgb(38,38,38)] transition-all flex place-items-center gap-2 py-1 px-2 rounded"
              >
                <EditIcon />
                Edit profile
              </Link>
            </div>
          )}
        </div>
      </div>
      <p className="flex items-center self-center gap-1">
        <PostsIcon />
        Posts
      </p>

      {data?.posts.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 pt-2">
          {data.posts.map((ele: any) => (
            <Image
              key={ele._id}
              src={ele.imageUrl}
              alt="loading.."
              width={250}
              height={250}
            />
          ))}
        </div>
      ) : (
        <p className="flex self-center text-3xl pt-28">Aww No Posts</p>
      )}
    </div>
  );
}
