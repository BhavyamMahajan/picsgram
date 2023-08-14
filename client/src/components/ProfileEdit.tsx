"use client";
import Image from "next/image";
import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import demoImg from "../../public/assets/userdemoimg.png";
import { useRouter } from "next/navigation";

type Props = {
  data: {
    username: string;
    name: string;
    bio: string;
    profileImg: string;
  };
};

export default function ProfileEdit({ data }: Props) {
  const { username, name, bio, profileImg } = data;

  const router = useRouter();
  const [newName, setNewName] = useState(name);
  const [newBio, setNewBio] = useState(bio);
  const [selectedImg, setSelectedImg] = useState<any>(profileImg);

  const handleImage = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => {
      setSelectedImg(fileReader.result);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = JSON.stringify({
      username,
      name: newName,
      bio: newBio,
      profileImg: selectedImg,
    });
    console.log(data);
    const res = await fetch("http://localhost:5000/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    if (res.status === 200) router.back();
  };
  return (
    <form
      className="w-[70%] m-auto border-2 border-zinc-800 rounded p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div>
        <Image
          src={selectedImg ? selectedImg : demoImg}
          alt="Profile"
          width={250}
          height={250}
          className="rounded-full m-auto"
        />

        <label className="w-[85%] flex justify-end">
          <input type="file" hidden onChange={handleImage} />
          <p className="bg-[rgb(54,54,54)] p-1 rounded-md font-semibold cursor-pointer">
            Upload Image
          </p>
        </label>
      </div>

      <div className="w-full flex gap-4">
        <label className="w-full flex flex-col gap-1">
          <p>username</p>
          <input
            type="text"
            value={username}
            disabled
            className="w-full bg-transparent border-2 border-zinc-600 rounded p-1"
          />
        </label>
        <label className="w-full flex flex-col gap-1">
          <p>name</p>
          <input
            type="text"
            value={newName}
            className="w-full bg-transparent border-2 border-zinc-600 rounded p-1"
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
      </div>
      <label className="w-full flex flex-col gap-1">
        <p>bio</p>
        <textarea
          rows={3}
          value={newBio}
          className="w-full resize-none bg-transparent border-2 border-zinc-600 rounded p-1"
          onChange={(e) => setNewBio(e.target.value)}
        />
      </label>
      <div className="flex justify-center">
        <PrimaryBtn
          disabled={
            newName === name && newBio === bio && selectedImg === profileImg
              ? true
              : false
          }
        >
          Submit
        </PrimaryBtn>
      </div>
    </form>
  );
}
