"use client";
import moment from "moment";
import Image from "next/image";
import LikeBtn from "./LikeBtn";
import AddComment from "./AddComment";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardSkeletonLoader } from "./SkeletonLoader";
import demoImg from "../../public/assets/userdemoimg.png";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../app/[username]/create-post/styles.css";

type Props = {
  username: string;
  posts: Posts;
  postsLiked: PostsLiked;
};

type Posts = {
  postId: string;
  comments: { username: string; comment: string }[];
  likes: Number;
  caption: string;
  postTime: string;
  postedBy: string;
  postedImg: [];
  profileUrl: string;
}[];

type PostsLiked = string[];

export default function Feeds({ username, posts, postsLiked }: Props) {
  function arrayBufferToBase64(buffer: any) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      {posts?.length > 0 ? (
        posts?.map((ele, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 border border-zinc-700 rounded py-2"
          >
            <div className="md:px-6 flex items-center gap-3 px-2 pb-1">
              <Image
                src={ele?.profileUrl || demoImg}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full w-[50px] h-[50px]"
              />

              <p className="font-semibold">{ele?.postedBy}</p>
              <ul className="pl-4">
                <li className="list-disc text-zinc-600">
                  {moment(ele?.postTime).fromNow()}
                </li>
              </ul>
            </div>
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            >
              {ele?.postedImg?.map((url: any, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`data:${url.mimetype};base64,${url.buffer}`}
                    alt="Image"
                    width={500}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex md:px-4">
              <LikeBtn
                username={username}
                postId={ele?.postId}
                postsLiked={postsLiked}
                totalLikes={ele?.likes}
              />
            </div>
            {ele?.caption && (
              <p className="flex gap-2 px-2 md:px-4">
                <span className="font-bold">{ele?.postedBy}</span>
                {ele?.caption}
              </p>
            )}
            <div className="md:px-4">
              <AddComment
                username={username}
                postId={ele?.postId}
                comments={ele?.comments}
              />
            </div>
          </div>
        ))
      ) : (
        <>
          <CardSkeletonLoader />
          <CardSkeletonLoader />
          <CardSkeletonLoader />
        </>
      )}
    </div>
  );
}
