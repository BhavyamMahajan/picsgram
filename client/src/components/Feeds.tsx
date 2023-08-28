import moment from "moment";
import Image from "next/image";
import LikeBtn from "./LikeBtn";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";
import demoImg from "../../public/assets/userdemoimg.png";
import { SkeletonLoader } from "./SkeletonLoader";

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
  postedImg: any;
  profileUrl: string;
}[];

type PostsLiked = string[];

export default function Feeds({ username, posts, postsLiked }: Props) {
  // const [posts, setPosts] = useState<Posts>();
  // const [postsLiked, setPostsLiked] = useState<PostsLiked>();

  // useEffect(() => {
  //   const getFeeds = async (username: string) => {
  //     const res = await fetch(`http://localhost:5000/feeds/${username}`, {
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     setPosts(data.posts);
  //     setPostsLiked(data.postsLiked);
  //   };
  //   getFeeds(username);
  // }, [username]);

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
            <div className="flex items-center gap-3 px-2 pb-1">
              <Image
                src={ele?.profileUrl || demoImg}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full"
              />

              <p className="font-semibold">{ele?.postedBy}</p>
              <ul className="px-2">
                <li className="list-disc text-zinc-600">
                  {moment(ele?.postTime).fromNow()}
                </li>
              </ul>
            </div>

            <Image
              src={`data:${
                "image/jpeg" || "image/jpg" || "image/png"
              };base64,${arrayBufferToBase64(ele?.postedImg.data)}`}
              alt="Image"
              width={500}
              height={500}
            />
            <LikeBtn
              username={username}
              postId={ele?.postId}
              postsLiked={postsLiked}
              totalLikes={ele?.likes}
            />
            {ele?.caption && (
              <p className="flex gap-2 px-2">
                <span className="font-bold">{ele?.postedBy}</span>
                {ele?.caption}
              </p>
            )}
            <AddComment
              username={username}
              postId={ele?.postId}
              comments={ele?.comments}
            />
          </div>
        ))
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
}
