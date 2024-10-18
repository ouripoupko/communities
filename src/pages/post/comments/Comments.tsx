import React, { Fragment, RefObject, useEffect, useRef, useState } from "react";
import styles from "./Comments.module.scss";
import { iComment } from "reducers/PostsSlice";

export type iBarColor = {
  color: string;
  next?: iBarColor;
};

type iCommentsProps = {
  comments: iComment[];
  indexes: number[];
  barColor?: iBarColor;
  handleAddComment: (
    parent: number | null,
    ref: RefObject<HTMLInputElement>
  ) => void;
};

const Comments: React.FC<iCommentsProps> = ({
  comments,
  indexes,
  barColor,
  handleAddComment,
}) => {
  const [replyIndex, setReplyIndex] = useState(-1);
  const [willClick, setWillClick] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyIndex]);

  const handleBlur = () => {
    if (!willClick) {
      setReplyIndex(-1);
    }
  };

  const handleClick = (parent: number, ref: RefObject<HTMLInputElement>) => {
    handleAddComment(parent, ref);
    setReplyIndex(-1);
    setWillClick(false);
  };

  const handleAbort = () => {
    if (willClick) {
      setReplyIndex(-1);
      setWillClick(false);
    }
  };

  return (
    <>
      {indexes
        .map((index) => comments[index])
        .map((comment) => (
          <Fragment key={comment.index}>
            <div>{comment.text}</div>
            <div
              style={{
                borderLeft: `2px solid ${barColor?.color}`,
                marginLeft: "5px",
                paddingLeft: "5px",
              }}
            >
              <Comments
                comments={comments}
                indexes={comment.kids}
                barColor={barColor?.next}
                handleAddComment={handleAddComment}
              />
            </div>
            {comment.index === replyIndex ? (
              <>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Add a comment"
                  onBlur={handleBlur}
                />
                <button
                  onClick={() => handleClick(comment.index, inputRef)}
                  onMouseDown={() => setWillClick(true)}
                  onMouseLeave={handleAbort}
                >
                  add
                </button>
              </>
            ) : (
              <div
                className={styles["reply-link"]}
                onClick={() => setReplyIndex(comment.index)}
              >
                reply
              </div>
            )}
          </Fragment>
        ))}
    </>
  );
};

export default Comments;
