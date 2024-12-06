import { useState } from "react";
import styles from "./Main.module.scss";
import Header from "./header/Header";
import { EMainPage } from "enums/MainEnums";
import Profile from "./profile/Profile";
import Communities from "./communities/Communities";
import FooterNavigator from "./footer/FooterNavigator";

const Main = () => {
  const [currentView, setCurrentView] = useState(EMainPage.Profile);

  return (
    <div className={styles["main-page"]}>
      <Header></Header>
      <div className={styles["main-content"]}>
        {currentView == EMainPage.Profile && <Profile></Profile>}
        {currentView == EMainPage.Communities && <Communities></Communities>}
      </div>
      <FooterNavigator setCurrentView={setCurrentView} currentPage={currentView}></FooterNavigator>
    </div>
  );
};

export default Main;
