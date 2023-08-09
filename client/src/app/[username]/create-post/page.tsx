import Post from "./Post";

export default function page({ params }: { params: { username: string } }) {
  const { username } = params;

  return <Post username={username} />;
}
