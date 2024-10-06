import React, { useEffect } from 'react';
import '../../index.css';

const ProgressBar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('myBar').style.width = `${scrolled}%`;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="progress-container">
      <div id="myBar" className="progress-bar"></div>
    </div>
  );
};

export default ProgressBar;
