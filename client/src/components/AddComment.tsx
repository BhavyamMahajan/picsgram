"use client";
import { FormEventHandler, useState } from "react";
import { SendIcon } from "../../public/Icons";

type Props = {
  username: string;
  postId: string;
};

export default function AddComment({ username, postId }: Props) {
  const [comment, setComment] = useState("");

  const addComment = async (e: any) => {
    e.preventDefault();
    if (!comment) return;

    const res = await fetch("http://localhost:5000/add-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        comment,
        postId,
      }),
    });

    if (res.status === 200) setComment("");
  };

  return (
    <form
      className="flex items-center gap-2 border-t border-zinc-800 px-2"
      onSubmit={addComment}
    >
      <input
        type="text"
        value={comment}
        placeholder="Add a comment"
        className="w-full py-1 bg-transparent border-none outline-none pb-4"
        onChange={(e) => setComment(e.target.value)}
      />
      {comment && (
        <span className="cursor-pointer" onClick={addComment}>
          <SendIcon />
        </span>
      )}
    </form>
  );
}
