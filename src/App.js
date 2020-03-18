import React from "react";
import {MainContext} from './context/context'
import MainSection from './components/MainSection'
import balloonCategories from './data/balloonCategories.json'
import balloonsImages from './data/balloonsImgs.json'
import "./scss/main.scss";
import "materialize-css";


function App({dropdown}) {
  
  return (
    <MainContext.Provider value={{
      balloonsImages, balloonCategories,dropdown
    }}>
      <MainSection />
    </MainContext.Provider>
  );
}

export default App;
