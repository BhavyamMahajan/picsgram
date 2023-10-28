"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Satisfy } from "next/font/google";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import PrimaryBtn from "@/components/PrimaryBtn";
import { ClosedEyeIcon, OpenEyeIcon } from "../../../../public/Icons";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });

export default function Signup() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (!email) {
      setLoading(false);
      return toast.error("Please enter an email");
    }

    if (!name) {
      setLoading(false);
      return toast.error("Please enter a name");
    }

    if (!userName) {
      setLoading(false);
      return toast.error("Please enter a username");
    }
    if (!/^[^- ]*$/.test(userName)) {
      setLoading(false);
      return toast.error("Enter a username without using - or spaces");
    }

    if (password.length < 8) {
      setLoading(false);
      return toast.error("Password length should be greater than 8 characters");
    }

    const data = JSON.stringify({
      email,
      name,
      username: userName,
      password,
    });

    const res = await fetch("http://localhost:5000/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    const result = await res.json();

    if (res.status === 400) {
      setLoading(false);
      return toast.error(result.error);
    }
    if (res.status === 200) router.push("/");
  };

  return (
    <div className="sm:w-4/5 w-96 flex flex-col gap-3 pt-32">
      <div className="flex flex-col gap-14 px-8 py-12 sm:px-4 border rounded">
        <h1 className={`${satisfy.className} text-5xl text-center`}>
          Picsgram
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSignup}>
          <FormInput
            stateName={email}
            setState={setEmail}
            labelName="email"
            type="email"
          />
          <FormInput
            stateName={name}
            setState={setName}
            labelName="name"
            type="text"
          />
          <FormInput
            stateName={userName}
            setState={setUserName}
            labelName="username"
            type="text"
          />
          <FormInput
            stateName={password}
            setState={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            labelName="Password"
            type="password"
            svg={showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          />

          <PrimaryBtn
            disabled={!email || !name || !userName || !password ? true : false}
            isLoading={isLoading}
          >
            Sign up
          </PrimaryBtn>
        </form>
      </div>
      <div className="border rounded px-8 py-6 sm:px-4">
        Have an account ?&nbsp;
        <Link href="/" className="text-blue">
          Log in
        </Link>
      </div>
    </div>
  );
}
