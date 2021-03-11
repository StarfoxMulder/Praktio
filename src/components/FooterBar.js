import React from 'react';
import { useSelector } from 'react-redux';

import './FooterBar.scss';

const FooterBar = () => {
  const { number, total } = useSelector((state) => {
    const { quiz } = state;
    const { selected, number, total } = quiz;
    return { selected, number, total };
  });

  const renderProgress = () => {
    if (!number || !total) {
      return null;
    }

    const progress = (number / total) * 100;
    return (
      <>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: progress + '%' }}></div>
          <span className="progress-value">
            {number}/{total}
          </span>
        </div>
      </>
    );
  };

  const progress = renderProgress();

  return (
    <div className="FooterBar">
      <div className="left-container">
        <div className="left-group" />
      </div>
      <div className="middle-container">{progress}</div>
      <div className="right-container"></div>
    </div>
  );
};

export default FooterBar;
