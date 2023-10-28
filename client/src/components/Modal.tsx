"use client";
import "swiper/css";
import { useEffect, useState } from "react";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LikeBtn from "./LikeBtn";

import { Swiper, SwiperSlide } from "swiper/react";
import "../app/[username]/account-settings/styles.css";
import demoImg from "../../public/assets/userdemoimg.png";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { CommentIcon } from "../../public/Icons";

export default function Modal({
  data,
  username,
  setModalData,
  query,
}: {
  data: any;
  username: string;
  setModalData: any;
  query: boolean;
}) {
  const handleClick = (e: any) => {
    if (e.target.id === "modal") setModalData({ isOpen: false, data: {} });
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      {data?.isOpen && (
        <div
          id="modal"
          className="md:hidden bg-slate-400/40 fixed top-0 left-0 w-full h-screen backdrop-blur-[2px] flex justify-center items-center"
        >
          <div className="w-[70%] h-[70%] bg-black flex ">
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="flex-1 my_swiper"
            >
              {data?.data?.imageUrl?.map((url: any) => (
                <SwiperSlide>
                  <Image
                    src={`data:${url.mimetype};base64,${url.buffer}`}
                    alt="Image"
                    width={400}
                    height={400}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex-1 flex flex-col border-l">
              <div className="flex gap-2 border-b">
                <p
                  className={`flex self-center justify-center flex-1 rounded-sm py-2`}
                >
                  Comments
                </p>
              </div>

              <div className="h-96 overflow-y-scroll px-4 pt-4">
                {data?.data?.caption && (
                  <div className="flex items-start gap-2 pb-4">
                    <Image
                      src={data?.profileImg || demoImg}
                      alt="profile"
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <p className="">
                      <span className="font-semibold">
                        {data?.data?.username}
                      </span>
                      &nbsp; {data?.data?.caption}
                    </p>
                  </div>
                )}
                {data?.data?.comments?.length > 0 ? (
                  data?.data?.comments?.map((ele: any, index: number) => (
                    <p key={index} className="flex gap-2 px-2">
                      <span className="font-bold">{ele.username}</span>
                      {ele.comment}
                    </p>
                  ))
                ) : (
                  <p className="p-4 ">No, Comments</p>
                )}
              </div>

              <div className="flex gap-2 border-t px-2 py-2 mt-auto">
                <LikeBtn
                  username={username}
                  postId={data?.data?._id}
                  postsLiked={data?.postsLiked}
                  totalLikes={data?.data?.likes}
                />
                <p className="flex flex-col items-center gap-1">
                  <CommentIcon />
                  {data?.data?.comments.length}
                </p>
              </div>
            </div>
          </div>
          <span
            className="fixed top-8 right-20 text-4xl cursor-pointer"
            onClick={() => setModalData({ isOpen: false, data: {} })}
          >
            &#10005;
          </span>
        </div>
      )}
    </>
  );
}
