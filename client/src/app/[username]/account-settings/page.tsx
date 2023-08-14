import ViewProfile from "@/components/ViewProfile";

const getUserDetails = async (username: string) => {
  const data = await fetch(`http://localhost:5000/user-profile/${username}`, {
    cache: "no-store",
  });
  const res = await data.json();
  return res;
};

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await getUserDetails(username);

  return <ViewProfile data={data} username={username} />;
}
