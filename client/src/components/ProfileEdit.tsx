"use client";
import Image from "next/image";
import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { useRouter } from "next/navigation";
import demoImg from "../../public/assets/userdemoimg.png";
import { toast } from "react-toastify";

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
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 5000000)
      return toast.error("file size must be less than 5mb");
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

    const res = await fetch("http://localhost:5000/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (res.status === 200) router.back();
  };
  return (
    <form
      className="md:w-[80%] w-[70%] m-auto border-2 border-zinc-800 rounded p-4 flex flex-col gap-8"
      onSubmit={handleSubmit}
    >
      <div className="md:flex md:flex-col md:gap-2">
        <Image
          src={selectedImg ? selectedImg : demoImg}
          alt="Profile"
          width={250}
          height={250}
          className="w-[250px] h-[250px] rounded-full m-auto md:w-[100px] md:h-[100px]"
        />

        <label className="md:w-[100%] md:justify-center w-[85%] flex justify-end">
          <input type="file" hidden onChange={handleImage} accept="image/*" />
          <p className="bg-[rgb(54,54,54)] p-1 rounded-md font-semibold cursor-pointer">
            Upload Image
          </p>
        </label>
      </div>

      <div className="w-full flex gap-4 md:flex-col">
        <label className="w-full flex flex-col gap-1">
          <p>username</p>
          <input
            type="text"
            value={username}
            disabled
            className="w-full bg-transparent border-2 border-zinc-600 rounded p-1 disabled:cursor-not-allowed"
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
