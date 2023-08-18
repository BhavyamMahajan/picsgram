"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SkeletonLoader } from "./SkeletonLoader";
import demo from "../../public/assets/userdemoimg.png";
import { EditIcon, PostsIcon, VerifiedBatch } from "../../public/Icons";

type Props = {
  data?: any;
  username: string;
  query?: boolean;
};
export default function ViewProfile({ data, username, query = false }: Props) {
  const [dataa, setDataa] = useState(data);

  useEffect(() => {
    const getUserDetails = async () => {
      const data = await fetch(
        `http://localhost:5000/user-profile/${username}`,
        {
          cache: "no-store",
        }
      );
      const res = await data.json();
      setDataa(res);
    };
    if (!data) getUserDetails();
  }, [data, username]);

  return (
    <>
      {dataa?.name ? (
        <div className="w-4/5 m-auto flex flex-col gap-2 px-8 md:w-[90%] md:px-0">
          <div className="flex gap-16 border-b border-zinc-800 pb-8 md:gap-8">
            <Image
              src={dataa?.profileImg || demo}
              alt={username}
              width={150}
              height={150}
              className="rounded-full md:w-[100px] md:h-[100px]"
            />
            <div className="flex flex-col gap-2 w-3/5">
              <p className="flex gap-2 items-center text-xl">
                {username} {dataa?.isVerified && <VerifiedBatch />}
              </p>
              <p className="capitalize">{dataa?.name}</p>
              {dataa?.bio && <p>{dataa.bio}</p>}
              {!query && (
                <div className="mt-auto flex justify-end md:pt-4">
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

          {dataa?.posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 pt-2">
              {dataa.posts.map((ele: any) => (
                <Image
                  key={ele._id}
                  src={ele.imageUrl}
                  alt="loading.."
                  width={250}
                  height={250}
                  className="w-[100%] h-[100%]"
                />
              ))}
            </div>
          ) : (
            <p className="flex self-center text-3xl pt-28">Aww No Posts</p>
          )}
        </div>
      ) : (
        <SkeletonLoader />
      )}
    </>
  );
}
