import React from 'react';
import classNames from 'classnames';

import './Panel.scss';

const Panel = ({ panel, children, classes }) => {
  const { width } = panel || {};
  return (
    <div
      className={classNames('Panel', ...(classes || []))}
      style={{ width: `${(width || 1) * 100}%` }}
    >
      {children}
    </div>
  );
};

export default Panel;
