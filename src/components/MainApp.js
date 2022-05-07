import React, {useContext} from "react";
import { Bidder } from "./participants/Bidder";
import { Creator } from "./participants/Creator";

import AppViews from './views/AppView';
import { MainAppContext } from "../context/MainAppContext";

const MainApp = () => {
  const mainApp = useContext(MainAppContext);

  const checkParticipant = () => {
    if (mainApp.participant === 'Bidder'){
      return <Bidder/>;
    } else if (mainApp.participant === 'Creator'){
      return <Creator/>;
    } else return false;
  }

  return(
    false == checkParticipant() ? <AppViews view={mainApp.appView}></AppViews>: checkParticipant()
  );
}

export default MainApp;