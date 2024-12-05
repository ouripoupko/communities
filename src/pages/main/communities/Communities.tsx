import { useDispatch, useSelector } from "react-redux";
import styles from "./Communities.module.scss";
import { AppDispatch, RootState } from "Store";
import { useEffect, useRef } from "react";
import { createCommunity, fetchCommunities } from "reducers/CommunityListSlice";
import { Link } from "react-router-dom";

const Communities = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { communities, status } = useSelector(
    (state: RootState) => state.communityList
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddCommunity = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      // Check if input is not empty
      dispatch(createCommunity(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  return (
    <div className={styles["communities"]}>
      <div className={styles["add-community"]}>
        <input type="text" ref={inputRef} placeholder="Enter a name" />
        <button onClick={handleAddCommunity}>add</button>
      </div>
      {Object.values(communities).map((community, id) => (
        <div key={id}>
          <Link to={`/community/${community}`}>{community}</Link>
        </div>
      ))}
    </div>
  );
};

export default Communities;
