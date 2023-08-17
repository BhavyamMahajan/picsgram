import ProfileEdit from "@/components/ProfileEdit";

const getUserDetails = async (username: string) => {
  const res = await fetch(`http://localhost:5000/edit/${username}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await getUserDetails(username);

  return <ProfileEdit data={data} />;
}
