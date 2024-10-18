import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createPost, fetchTopic } from "reducers/TopicsSlice";
import { AppDispatch, RootState } from "Store";

const Wall = () => {
  const { community: communityId, topic: topicId } = useParams<{
    community: string;
    topic: string;
  }>();
  const dispatch = useDispatch<AppDispatch>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const posts = useSelector((state: RootState) =>
    topicId ? state.topics[topicId]?.posts : undefined
  );

  const handleAddPost = () => {
    const newPost = textAreaRef.current?.value;
    if (communityId && topicId && newPost && newPost.trim() !== "") {
      // Check if input is not empty
      dispatch(createPost({ topic: topicId, post: newPost }));
      textAreaRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!posts && topicId) {
      dispatch(fetchTopic(topicId));
    }
  }, [dispatch, posts, topicId]);

  return (
    <>
      <textarea
        rows={4}
        cols={50}
        ref={textAreaRef}
        placeholder="Enter your post"
      />
      <button onClick={handleAddPost}>add</button>
      {posts &&
        posts.map((post, id) => (
          <div key={id}>
            <Link to={`/community/${communityId}/topic/${topicId}/post/${id}`}>
              {post}
            </Link>
          </div>
        ))}
    </>
  );
};

export default Wall;
