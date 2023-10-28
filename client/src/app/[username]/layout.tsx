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
    <div className="flex md:block">
      <UserValidation username={username}>
        <NavBar username={username} />
        <div className="w-full py-8 md:pb-20">{children}</div>
      </UserValidation>
    </div>
  );
}
