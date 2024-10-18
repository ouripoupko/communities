import BubbleFilters from "components/ui/filters/Filters";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createTopic, fetchCommunity } from "reducers/CommunitiesSlice";
import { AppDispatch, RootState } from "Store";

const Discussion = () => {
  const { community: communityId } = useParams<{ community: string }>();
  const [filter, setFilter] = useState("All");
  const [newTopic, setNewTopic] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const topics = useSelector((state: RootState) =>
    communityId ? state.communities[communityId]?.topics : undefined
  );

  const onFilterChange = (selected: string) => {
    setFilter(selected);
  };

  const handleAddTopic = () => {
    if (communityId && newTopic.trim() !== "") {
      // Check if input is not empty
      dispatch(createTopic({ community: communityId, title: newTopic }));
      setNewTopic(""); // Clear the input after dispatch
    }
  };

  useEffect(() => {
    if (!topics && communityId) {
      dispatch(fetchCommunity(communityId));
    }
  }, [dispatch]);

  return (
    <>
      <BubbleFilters
        filters={["All", "Open", "Closed"]}
        selected={filter}
        onFilterChange={onFilterChange}
      />
      <input
        type="text"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)} // Update inputValue on change
        placeholder="Enter a topic"
      />
      <button onClick={handleAddTopic}>add</button>
      {topics && topics.map((topic, id) => (
        <div key={id}>
          <Link to={`/community/${communityId}/topic/${topic}`}>
            {topic}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Discussion;
