import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector((state: RootState) =>
    topicId && postId ? state.topics[topicId]?.posts[Number(postId)] : undefined
  );
  const comments = useSelector((state: RootState) =>
    topicId && postId ? state.posts[topicId + postId] : undefined
  );

  const handleAddComment = (parent: number | null) => {
    if (communityId && topicId && postId && newComment.trim() !== "") {
      // Check if input is not empty
      dispatch(
        createComment({
          topic: topicId,
          post: postId,
          comment: newComment,
          parent,
        })
      );
      setNewComment(""); // Clear the input after dispatch
    }
  };

  useEffect(() => {
    if (!comments && topicId && postId) {
      dispatch(fetchPost({ topic: topicId, post: postId }));
    }
  }, [dispatch]);

  const indexes = comments
    ?.filter((comment) => comment.parent === null)
    .map((comment) => comment.index);
  const color: iBarColor = { color: "", next: null };

  return (
    <>
      {post && <div>{post}</div>}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)} // Update inputValue on change
        placeholder="Add a comment"
      />
      <button onClick={() => handleAddComment(null)}>add</button>
      {comments && indexes && (
        <Comments comments={comments} indexes={indexes} barColor={color} />
      )}
    </>
  );
};

export default Post;
