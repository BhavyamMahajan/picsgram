import moment from "moment";
import Image from "next/image";
import LikeBtn from "@/components/LikeBtn";
import AddComment from "@/components/AddComment";
import ViewComments from "@/components/ViewComments";
import demoimg from "../../../public/assets/userdemoimg.png";
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
