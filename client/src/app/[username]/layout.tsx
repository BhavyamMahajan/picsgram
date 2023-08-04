import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import UserValidation from "./UserValidation";

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string };
}) {
  const { username } = params;

  return (
    <div className="flex">
      <UserValidation username={username} />
      <NavBar />
      {children}
    </div>
  );
}
