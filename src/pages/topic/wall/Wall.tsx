import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createPost, fetchTopic } from "reducers/TopicsSlice";
import { AppDispatch, RootState } from "Store";

const Wall = () => {
  const { community: communityId, topic: topicId } = useParams<{
    community: string;
    topic: string;
  }>();
  const [newPost, setNewPost] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) =>
    topicId ? state.topics[topicId]?.posts : undefined
  );

  const handleAddPost = () => {
    if (communityId && topicId && newPost.trim() !== "") {
      // Check if input is not empty
      dispatch(createPost({ topic: topicId, post: newPost }));
      setNewPost(""); // Clear the input after dispatch
    }
  };

  useEffect(() => {
    if (!posts && topicId) {
      dispatch(fetchTopic(topicId));
    }
  }, [dispatch]);

  return (
    <>
      <textarea
        rows={4}
        cols={50}
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)} // Update inputValue on change
        placeholder="Enter your post"
      />
      <button onClick={handleAddPost}>add</button>
      {posts &&
        posts.map((post, id) => (
          <div key={id}>
            <Link to={`/community/${communityId}/topic/${topicId}/post/${id}`}>{post}</Link>
          </div>
        ))}
    </>
  );
};

export default Wall;
