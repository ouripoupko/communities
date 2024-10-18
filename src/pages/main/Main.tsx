import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.scss";
import { AppDispatch, RootState } from "Store";
import { useEffect, useState } from "react";
import { createCommunity, fetchCommunities } from "reducers/CommunityListSlice";
import { Link } from "react-router-dom";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { communities, status } = useSelector(
    (state: RootState) => state.communityList
  );
  const [newName, setNewName] = useState("");

  const handleAddCommunity = () => {
    if (newName.trim() !== "") {
      // Check if input is not empty
      dispatch(createCommunity(newName));
      setNewName(""); // Clear the input after dispatch
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  return (
    <div>
      <div className={styles.header}>
        <div>gloKi</div>
        <div>&#9776;</div>
      </div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)} // Update inputValue on change
        placeholder="Enter a name"
      />
      <button onClick={handleAddCommunity}>add</button>
      {Object.values(communities).map((community, id) => (
        <div key={id} >
          <Link to={`/community/${community}`}>
            {community}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Main;
