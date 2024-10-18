import { useParams } from "react-router-dom";
import Wall from "./wall/Wall";
import Tabs from "components/layout/tabs/Tabs";

const Topic = () => {
  const { community: communityId, topic: topicId } = useParams<{
    community: string;
    topic: string;
  }>();

  return (
    <>
      <div>{topicId}</div>
      <Tabs
        tabs={{
          Wall: Wall,
          Proposals: () => <div>proposals</div>,
          Vote: () => <div>vote</div>,
        }}
      />
    </>
  );
};

export default Topic;
