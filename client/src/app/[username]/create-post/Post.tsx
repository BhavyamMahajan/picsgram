"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import demoImg from "../../../../public/assets/ulpoadImg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "./styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Post({ username }: { username: string }) {
  const [selectedImg, setSelectedImg] = useState<any[]>([]);
  const [caption, setCaption] = useState("");
  const [postImg, setImgPost] = useState<any>([]);

  const handleImage = (e: any) => {
    if (!e.target.files[0]) return;
    if (e.target.files[0].size > 5000000)
      return toast.error("file size must be less than 5mb");
    setImgPost([...postImg, e.target.files[0]]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!selectedImg) {
      toast.error("Select Image");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("caption", caption);
    postImg?.map((file: any) => formData.append("file", file));

    const res = await fetch("http://localhost:5000/create-post", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      toast.success("Image uploaded successfully");
      setSelectedImg([]);
      setImgPost([]);
      setCaption("");
    }
  };

  return (
    <div className="flex place-items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-zinc-800 flex flex-col gap-2 rounded-md overflow-hidden md:w-[80%]"
      >
        {postImg.length > 0 ? (
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper"
          >
            {postImg?.map((imgUrl: Blob, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={URL.createObjectURL(imgUrl)}
                  alt="Upload"
                  width={400}
                  height={400}
                  className="w-[400px] h-[400px] md:w-[300px] md:h-[300px] p-6 object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={demoImg}
            alt="Upload"
            width={400}
            height={400}
            className="w-[400px] h-[400px] md:w-[300px] md:h-[300px] p-6"
          />
        )}
        <label className="flex justify-center">
          <input
            type="file"
            hidden
            onChange={handleImage}
            multiple
            accept="image/*"
          />
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
