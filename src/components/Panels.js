import React from 'react';

import AssetPanel from './AssetPanel';
import ChoicesPanel from './ChoicesPanel';
import { useSelector } from 'react-redux';

import { PanelType } from '../utils/constants';

import './Panels.scss';

const Panels = () => {
  const { panels } = useSelector((state) => {
    const { current } = state.activities;
    const panels = (current || {}).panels || [];
    return {
      panels,
    };
  });

  const renderPanels = () => {
    return panels.map((p) => {
      const { type, _id } = p;
      switch (type) {
        case PanelType.Timeless:
          return <AssetPanel key={_id} panel={p} />;
        case PanelType.Choices:
          return <ChoicesPanel key={_id} panel={p} />;
        default:
          return <></>;
      }
    });
  };

  return <div className="Panels">{renderPanels(panels)}</div>;
};
export default Panels;
