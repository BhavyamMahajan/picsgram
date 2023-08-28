"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import demoImg from "../../../../public/assets/ulpoadImg.png";

export default function Post({ username }: { username: string }) {
  const [selectedImg, setSelectedImg] = useState<any>();
  const [caption, setCaption] = useState("");
  const [postImg, setImgPost] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleImage = (e: any) => {
    setImgPost(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);

    fileReader.onload = () => {
      setSelectedImg(fileReader.result);
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedImg) {
      toast.error("Select Image");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("caption", caption);
    formData.append("file", postImg);

    const res = await fetch("http://localhost:5000/create-post", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      toast.success("Image uploaded successfully");
      setSelectedImg("");
      setImgPost("");
      setCaption("");
      setLoading(false);
    }
  };

  return (
    <div className="flex place-items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 flex flex-col gap-2 rounded-md overflow-hidden md:w-[80%]"
      >
        <Image
          src={selectedImg || demoImg}
          alt="Upload"
          width={400}
          height={400}
          className="w-[400px] h-[400px] md:w-[300px] md:h-[300px] p-6"
        />

        <label className="flex justify-center">
          <input type="file" hidden onChange={handleImage} />
          <p className="bg-blue p-1 rounded-md font-semibold cursor-pointer">
            Upload Image
          </p>
        </label>
        <div className="flex flex-col ">
          <textarea
            rows={3}
            value={caption}
            placeholder="caption..."
            className="text-black resize-none p-2 hover:outline-none hover:border-none"
            onChange={(e) => setCaption(e.target.value)}
          />

          <button type="submit" className="bg-blue_hover font-semibold">
            POST
          </button>
        </div>
      </form>
    </div>
  );
}
