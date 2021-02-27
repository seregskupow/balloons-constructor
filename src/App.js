import React, { useEffect, useState } from 'react';
import { MainContext } from './context/context';
import MainSection from './components/MainSection';
import Loader from './components/Loader';
import balloonCategories from './data/balloonCategories.json';
import balloonsImages from './data/balloonsImgs.json';
import parseOC from './additional/parseOC';
import getContentful from './additional/contentful';
import './scss/main.scss';
import 'materialize-css';

function App({ dropdown }) {
  const [data, setData] = useState('empty');
  useEffect(() => {
    const getData = async () => {
      // setData(await parseOC());
      // setData(await getContentful());
      setData(balloonsImages);
    };
    getData();
  }, []);
  if (data !== 'empty') {
    return (
      <MainContext.Provider
        value={{
          balloonsImages: data,
          balloonCategories,
          dropdown,
        }}
      >
        <MainSection />
      </MainContext.Provider>
    );
  }
  return <Loader />;
}

export default App;
