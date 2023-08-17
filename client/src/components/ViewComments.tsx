type Props = {
  comments: { username: string; comment: string }[];
};

export default function ViewComments({ comments }: Props) {
  return (
    <>
      {comments.length > 1 ? (
        <>
          <p className="flex gap-2 px-2">
            <span className="font-bold">
              {comments[comments.length - 1].username}
            </span>
            {comments[comments.length - 1].comment}
          </p>
          <details className="px-2">
            <summary className="list-none cursor-pointer text-zinc-600">
              View all {comments.length - 1} comments
            </summary>
            <div className="h-60 overflow-y-scroll">
              {comments.map(
                (ele, i) =>
                  i !== comments.length - 1 && (
                    <p key={i} className="flex gap-2">
                      <span className="font-bold">{ele.username}</span>
                      {ele.comment}
                    </p>
                  )
              )}
            </div>
          </details>
        </>
      ) : (
        <p className="flex gap-2 px-2">
          <span className="font-bold">
            {comments[comments.length - 1].username}
          </span>
          {comments[comments.length - 1].comment}
        </p>
      )}
    </>
  );
}
