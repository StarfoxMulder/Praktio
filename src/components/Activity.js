import React from 'react';

import Instructions from './Instructions';
import Panels from './Panels';

import './Activity.scss';

const Activity = () => {
  return (
    <div className="Activity">
      <Instructions />
      <Panels />
    </div>
  );
};

export default Activity;
