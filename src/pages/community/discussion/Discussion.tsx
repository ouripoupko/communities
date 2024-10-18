import BubbleFilters from "components/ui/filters/Filters";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createTopic, fetchCommunity } from "reducers/CommunitiesSlice";
import { AppDispatch, RootState } from "Store";

const Discussion = () => {
  const { community: communityId } = useParams<{ community: string }>();
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const topics = useSelector((state: RootState) =>
    communityId ? state.communities[communityId]?.topics : undefined
  );

  const onFilterChange = (selected: string) => {
    setFilter(selected);
  };

  const handleAddTopic = () => {
    const newTopic = inputRef.current?.value;
    if (communityId && newTopic && newTopic.trim() !== "") {
      // Check if input is not empty
      dispatch(createTopic({ community: communityId, title: newTopic }));
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!topics && communityId) {
      dispatch(fetchCommunity(communityId));
    }
  }, [dispatch, topics, communityId]);

  return (
    <>
      <BubbleFilters
        filters={["All", "Open", "Closed"]}
        selected={filter}
        onFilterChange={onFilterChange}
      />
      <input type="text" ref={inputRef} placeholder="Enter a topic" />
      <button onClick={handleAddTopic}>add</button>
      {topics &&
        topics.map((topic, id) => (
          <div key={id}>
            <Link to={`/community/${communityId}/topic/${topic}`}>{topic}</Link>
          </div>
        ))}
    </>
  );
};

export default Discussion;
