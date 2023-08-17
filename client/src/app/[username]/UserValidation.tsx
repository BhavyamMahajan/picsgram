"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { satisfy } from "../layout";

async function userDetails(username: string) {
  const res = await fetch("http://localhost:5000/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    body: JSON.stringify({ username }),
  });
  if (res.status === 400) return "400";

  return "200";
}

export default function UserValidation({ username }: { username: string }) {
  const router = useRouter();
  const [data, setData] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await userDetails(username);
      setData(data);
    }
    getData();
  }, [username]);

  if (data === "400") router.push("/");

  return (
    <p
      className={`hidden md:block ${satisfy.className} sticky top-0 bg-black px-4 py-2 text-2xl border-b border-zinc-600`}
    >
      Picsgram
    </p>
  );
}
