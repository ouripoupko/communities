import { EMainPage } from "enums/MainEnums";
import styles from "./FooterNavigator.module.scss"; 
import React from "react";

// Define the type for the props
interface FooterNavigatorProps {
  setCurrentView: (view: EMainPage) => void;
  currentPage: EMainPage;
}

const FooterNavigator: React.FC<FooterNavigatorProps> = ({
  setCurrentView,
  currentPage
}) => {
  return (
    <div className={styles.footer}>
      <span
        className={`${styles.navItem} ${currentPage === EMainPage.Profile ? styles.active : ""}`}
        onClick={() => setCurrentView(EMainPage.Profile)}
      >
        Profile
      </span>
      &emsp;&emsp;&emsp;
      <span
        className={`${styles.navItem} ${currentPage === EMainPage.Communities ? styles.active : ""}`}
        onClick={() => setCurrentView(EMainPage.Communities)}
      >
        Communities
      </span>
    </div>
  );
};

export default FooterNavigator;
