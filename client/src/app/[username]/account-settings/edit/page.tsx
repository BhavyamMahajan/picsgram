import ProfileEdit from "@/components/ProfileEdit";

export const cache = "no-store";

const getUserDetails = async (username: string) => {
  const res = await fetch(`http://localhost:5000/edit/${username}`);
  const data = await res.json();
  return data;
};

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const data = await getUserDetails(username);
  return <ProfileEdit data={data} />;
}
