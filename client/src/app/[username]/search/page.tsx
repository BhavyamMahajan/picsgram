import UserSearch from "@/components/UserSearch";

type Props = {
  params: { username: string };
  searchParams: { query: string };
};

export default async function Page({ params, searchParams }: Props) {
  const { username } = params;
  const { query } = searchParams;

  return <UserSearch username={username} query={query} />;
}
