import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment, fetchPost } from "reducers/PostsSlice";
import { AppDispatch, RootState } from "Store";
import Comments, { iBarColor } from "./comments/Comments";

const Post = () => {
  const {
    community: communityId,
    topic: topicId,
    post: postId,
  } = useParams<{
    community: string;
    topic: string;
    post: string;
  }>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) =>
    topicId && postId ? state.topics[topicId]?.posts[Number(postId)] : undefined
  );
  const comments = useSelector((state: RootState) =>
    topicId && postId ? state.posts[topicId + postId] : undefined
  );

  const handleAddComment = (
    parent: number | null,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    const newComment = ref.current?.value;
    if (
      communityId &&
      topicId &&
      postId &&
      newComment &&
      newComment.trim() !== ""
    ) {
      // Check if input is not empty
      dispatch(
        createComment({
          topic: topicId,
          post: postId,
          comment: newComment,
          parent,
        })
      );
      ref.current.value = "";
    }
  };

  useEffect(() => {
    if (!comments && topicId && postId) {
      dispatch(fetchPost({ topic: topicId, post: postId }));
    }
  }, [dispatch, comments, topicId, postId]);

  const indexes = comments
    ?.filter((comment) => comment.parent === null)
    .map((comment) => comment.index);
  const color: iBarColor = {
    color: "red",
    next: { color: "green", next: { color: "blue" } },
  };
  if (color.next && color.next.next) {
    color.next.next.next = color;
  }

  return (
    <>
      {post && <div>{post}</div>}
      <input ref={inputRef} type="text" placeholder="Add a comment" />
      <button onClick={() => handleAddComment(null, inputRef)}>add</button>
      {comments && indexes && (
        <Comments
          comments={comments}
          indexes={indexes}
          barColor={color}
          handleAddComment={handleAddComment}
        />
      )}
    </>
  );
};

export default Post;
