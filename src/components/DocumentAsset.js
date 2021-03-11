import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import './DocumentAsset.scss';

const DocumentAsset = ({ asset }) => {
  const { content } = asset;

  return (
    <div className="DocumentAsset">
      <div className="asset-content">{ReactHtmlParser(content || '')}</div>
    </div>
  );
};

export default DocumentAsset;
