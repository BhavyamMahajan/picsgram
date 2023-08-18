"use client";

import { useEffect, useState } from "react";
import { LikeButtonIcon, UnlikeButtonIcon } from "../../public/Icons";

type Props = {
  username: string;
  postId: string;
  postsLiked: string[] | undefined;
  totalLikes: any;
};
export default function LikeBtn({
  postId,
  postsLiked,
  totalLikes,
  username,
}: Props) {
  const [toggle, setToggle] = useState(false);
  const [flag, setFlag] = useState(false);

  const handleLikes = async () => {
    setToggle(!toggle);

    const res = await fetch("http://localhost:5000/update-likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        postId,
      }),
    });
  };

  useEffect(() => {
    if (postsLiked?.includes(postId)) {
      setToggle(true);
      setFlag(true);
    }
  }, [postsLiked, postId]);

  return (
    <div className="flex flex-col gap-1 self-start px-2">
      <span className="hover:animate-zoomIn" onClick={handleLikes}>
        {toggle ? <UnlikeButtonIcon /> : <LikeButtonIcon />}
      </span>

      <p>
        {flag
          ? toggle
            ? totalLikes
            : --totalLikes
          : toggle
          ? ++totalLikes
          : totalLikes}
        <span> likes</span>
      </p>
    </div>
  );
}
