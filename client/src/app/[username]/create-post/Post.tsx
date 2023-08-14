"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { UploadPostIcon } from "../../../../public/Icons";

export default function Post({ username }: { username: string }) {
  const [selectedImg, setSelectedImg] = useState<any>();
  const [caption, setCaption] = useState("");

  const handleImage = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => {
      setSelectedImg(fileReader.result);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedImg) {
      toast.error("Select Image");
      return;
    }

    const data = JSON.stringify({
      username,
      imageUrl: selectedImg,
      caption,
    });

    const res = await fetch("http://localhost:5000/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    if (res.status === 200) {
      toast.success("Image uploaded successfully");
      setSelectedImg("");
    }
  };

  return (
    <div className="flex place-items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 flex flex-col gap-2 rounded-md overflow-hidden"
      >
        {selectedImg ? (
          <Image
            src={selectedImg}
            alt="Upload"
            width={400}
            height={400}
            className="p-6"
          />
        ) : (
          <UploadPostIcon />
        )}

        <label className="flex justify-center">
          <input type="file" hidden onChange={handleImage} />
          <p className="bg-blue p-1 rounded-md font-semibold cursor-pointer">
            Upload Image
          </p>
        </label>
        <textarea
          rows={3}
          placeholder="caption..."
          className="text-black resize-none p-2 hover:outline-none hover:border-none"
          onChange={(e) => setCaption(e.target.value)}
        />

        <button type="submit" className="bg-blue_hover font-semibold">
          POST
        </button>
      </form>
    </div>
  );
}
