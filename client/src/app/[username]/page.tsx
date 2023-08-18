import Feeds from "@/components/Feeds";
import Logout from "@/components/Logout";
import { CardSkeletonLoader } from "@/components/SkeletonLoader";

const getFeeds = async (username: string) => {
  const res = await fetch(`http://localhost:5000/feeds/${username}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { logout: string };
}) {
  const { username } = params;
  const { logout } = searchParams;

  if (logout) {
    return <Logout />;
  }

  const data = await getFeeds(username);
  const { posts, postsLiked } = data;

  return posts.length > 0 ? (
    <Feeds username={username} posts={posts} postsLiked={postsLiked} />
  ) : (
    <CardSkeletonLoader />
  );
}
