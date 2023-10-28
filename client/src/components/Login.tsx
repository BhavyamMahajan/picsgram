"use client";
import Link from "next/link";
import { useState } from "react";
import FormInput from "./FormInput";
import PrimaryBtn from "./PrimaryBtn";
import { satisfy } from "@/app/layout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ClosedEyeIcon, OpenEyeIcon } from "../../public/Icons";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = JSON.stringify({ username: name, password });

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });

    const result = await res.json();

    if (res.status === 400) {
      toast.error("Invalid username or password");
      setLoading(false);
    } else if (res.status === 200) {
      localStorage.setItem("jwt", result.accessToken);
      router.push(`/${result.username}`);
    }
  };

  return (
    <div className="sm:w-4/5 w-96 flex flex-col gap-3 pt-32">
      <div className="flex flex-col gap-14 px-8 py-12 sm:px-4 border rounded">
        <h1 className={`${satisfy.className} text-5xl text-center`}>
          Picsgram
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <FormInput
            stateName={name}
            setState={setName}
            labelName="username"
            type="text"
            required={true}
          />
          <FormInput
            stateName={password}
            setState={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            labelName="Password"
            type="password"
            required={true}
            svg={showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          />
          <PrimaryBtn
            disabled={!name || !password || isLoading ? true : false}
            isLoading={isLoading}
          >
            Log in
          </PrimaryBtn>
        </form>
      </div>
      <div className="border rounded px-8 py-6 sm:px-4 ">
        Don&apos;t have an account ?&nbsp;
        <Link href="/accounts/sign-up" className="text-blue">
          Sign up
        </Link>
      </div>
    </div>
  );
}
