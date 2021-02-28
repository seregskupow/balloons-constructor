import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="app-name">
          <div className="app-logo-container">
            <LazyLoadImage
              alt="шар"
              effect="blur"
              src="/mascotte.png"
              placeholderSrc="/loader.jpg"
            />
          </div>

          <p className="flow-text">Шарограф</p>

        </div>
      </div>
    </div>
  );
}
