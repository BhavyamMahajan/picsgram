import ViewProfile from "@/components/ViewProfile";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  return <ViewProfile username={username} />;
}
