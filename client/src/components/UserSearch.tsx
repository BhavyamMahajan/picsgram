"use client";
import Link from "next/link";
import Image from "next/image";
import ViewProfile from "./ViewProfile";
import { useEffect, useState } from "react";
import { SearchIcon } from "../../public/Icons";
import demoImg from "../../public/assets/userdemoimg.png";

type Props = {
  username: string;
  query: string;
};

export default function UserSearch({ username, query }: Props) {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<any>();
  const [data, setData] = useState();

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setSearchKey(e.target.value);

    if ((searchKey.length + 1) % 2 === 0) {
      const res = await fetch(`http://localhost:5000/search/${searchKey}`);
      const data = await res.json();
      setSearchResults(data);
    }
  };

  useEffect(() => {
    const getUserDetails = async (username: string) => {
      const data = await fetch(
        `http://localhost:5000/user-profile/${username}`,
        {
          cache: "no-store",
        }
      );
      const res = await data.json();
      setData(res);
    };
    getUserDetails(query);
  }, [query]);

  return (
    <>
      {query ? (
        <ViewProfile data={data} username={query} query={true} />
      ) : (
        <div className="w-[40%] m-auto flex flex-col gap-6">
          <div className="rounded-md flex gap-2 p-2 border">
            <input
              value={searchKey}
              type="text"
              className="w-full bg-transparent border-none outline-none"
              onChange={handleSearch}
            />
            <span>
              <SearchIcon />
            </span>
          </div>
          {searchResults &&
            (searchResults?.length > 0 ? (
              searchResults.map(
                (ele: any, i: number) =>
                  ele.username !== username && (
                    <Link
                      href={`/${username}/search?query=${ele.username}`}
                      key={i}
                      className="flex gap-3 rounded-md py-1 hover:bg-white/[.1] hover:transition-all"
                    >
                      <Image
                        src={ele.profileImg ? ele.profileImg : demoImg}
                        alt="loading..."
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="flex flex-col">
                        <span>{ele.username}</span>
                        <span className="capitalize text-zinc-600 font-medium">
                          {ele.name}
                        </span>
                      </p>
                    </Link>
                  )
              )
            ) : (
              <p>No user found</p>
            ))}
        </div>
      )}
    </>
  );
}
