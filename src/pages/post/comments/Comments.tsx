import React from "react";
import { iComment } from "reducers/PostsSlice";

export type iBarColor = {
  color: string;
  next: iBarColor | null;
};

type iCommentsProps = {
  comments: iComment[];
  indexes: number[];
  barColor: iBarColor;
};

const Comments: React.FC<iCommentsProps> = ({
  comments,
  indexes,
  barColor,
}) => {
  return (
    <>
      {comments.map((comment) => {
        <div>{comment.text}</div>;
      })}
     </>
  );
};

export default Comments;
