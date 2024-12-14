import { EMainPage } from "enums/MainEnums";
import styles from "./FooterNavigator.module.scss";
import React from "react";

import votesIcon from '../../../assets/icons/votes-footer-icon.svg';
import searchIcon from '../../../assets/icons/search-footer-icon.svg';
import favoritesIcon from '../../../assets/icons/favorites-footer-icon.svg';
import issueAreaIcon from '../../../assets/icons/issue-areas-footer-icon.svg';

interface FooterNavigatorProps {
  setCurrentView: (view: EMainPage) => void;
  currentPage: EMainPage;
}

interface NavItem {
  icon: string;
  label: string;
  view: EMainPage;
}

const FooterNavigator: React.FC<FooterNavigatorProps> = ({
  setCurrentView,
  currentPage
}) => {
  const navItems: NavItem[] = [
    {
      icon: votesIcon,
      label: 'Votes',
      view: EMainPage.Profile
    },
    {
      icon: issueAreaIcon,
      label: 'Issue Areas',
      view: EMainPage.Communities
    },
    {
      icon: favoritesIcon,
      label: 'Favorites',
      view: EMainPage.AddCommunity
    },
    {
      icon: searchIcon,
      label: 'Search',
      view: EMainPage.Find
    }
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerOutline}></div>
      <div className={styles.footer}>
        <div className={styles.navContainer}>
          {navItems.map((item) => (
            <div
              key={item.view}
              className={`${styles.navItem} ${
                currentPage === item.view ? styles.active : ""
              }`}
              onClick={() => setCurrentView(item.view)}
            >
              <div className={styles.iconWrapper}>
                <img src={item.icon} alt={item.label} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterNavigator;
