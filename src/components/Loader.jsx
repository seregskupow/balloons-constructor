import React from 'react';
import '../scss/loader.scss';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
