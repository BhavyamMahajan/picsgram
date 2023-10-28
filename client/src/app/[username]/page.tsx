import Feeds from "@/components/Feeds";

const getFeeds = async (username: string) => {
  const res = await fetch(`http://localhost:5000/feeds/${username}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  const data = await getFeeds(username);
  const { posts, postsLiked } = data;
  return <Feeds username={username} posts={posts} postsLiked={postsLiked} />;
}
