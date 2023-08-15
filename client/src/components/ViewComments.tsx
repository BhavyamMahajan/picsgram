type Props = {
  comments: { username: string; comment: string }[];
};

export default function ViewComments({ comments }: Props) {
  return (
    <details className="px-2">
      <summary className="list-none cursor-pointer text-zinc-600">
        View all comments
      </summary>
      <div className="h-60 overflow-y-scroll">
        {comments.map((ele, i) => (
          <p key={i} className="flex gap-2">
            <span className="font-bold">{ele.username}</span>
            {ele.comment}
          </p>
        ))}
      </div>
    </details>
  );
}
