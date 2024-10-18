import Tabs from "components/layout/tabs/Tabs";
import { useParams } from "react-router-dom";
import Discussion from "./discussion/Discussion";

const Community = () => {
  const { community } = useParams<{ community: string }>();
  return (
    <>
      <div>{community}</div>
      <Tabs
        tabs={{
          About: () => <div>about</div>,
          Members: () => <div>members</div>,
          Discussion: Discussion,
          Currency: () => <div>currency</div>
        }}
      />
    </>
  );
};

export default Community;
