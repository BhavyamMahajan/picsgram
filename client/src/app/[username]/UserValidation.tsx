"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const data = await res.json();
  return data;
}

export default function UserValidation({ username }: { username: string }) {
  const router = useRouter();
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {
      const data = await userDetails(username);
      setData(data);
    }
    getData();
  }, [username]);

  if (data === "400") router.push("/");
  console.log(data);
  return <p></p>;
}
