import ViewProfile from "@/components/ViewProfile";

const getUserDetails = async (username: string) => {
  const data = await fetch(`http://localhost:5000/user-profile/${username}`, {
    next: { tags: ["profile"], revalidate: 30 },
  });
  const res = await data.json();
  return res;
};

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await getUserDetails(username);

  return <ViewProfile data={data} username={username} />;
}
