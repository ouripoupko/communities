import { useDispatch, useSelector } from "react-redux";
import styles from "./Main.module.scss";
import { AppDispatch, RootState } from "Store";
import { useEffect, useRef } from "react";
import { createCommunity, fetchCommunities } from "reducers/CommunityListSlice";
import { Link } from "react-router-dom";

const Main = () => {
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
    <div className={styles["main-page"]}>
      <div className={styles["header"]}>
        <div>gloKi</div>
        <div>&#9776;</div>
      </div>
      <input type="text" ref={inputRef} placeholder="Enter a name" />
      <button onClick={handleAddCommunity}>add</button>
      {Object.values(communities).map((community, id) => (
        <div key={id}>
          <Link to={`/community/${community}`}>{community}</Link>
        </div>
      ))}
    </div>
  );
};

export default Main;
