import { EMainPage } from "enums/MainEnums";
import React from "react";

interface FooterNavigatorProps {
  setCurrentView: (view: EMainPage) => void;
}

const FooterNavigator: React.FC<FooterNavigatorProps> = ({
  setCurrentView,
}) => {
  return (
    <div>
      <span onClick={() => setCurrentView(EMainPage.Profile)}>Profile</span>&emsp;&emsp;&emsp;
      <span onClick={() => setCurrentView(EMainPage.Communities)}>Communities</span>
    </div>
  );
};

export default FooterNavigator;
