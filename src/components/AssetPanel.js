import React from 'react';
import { useSelector } from 'react-redux';

import StatefulAsset from './StatefulAsset';
import DocumentAsset from './DocumentAsset';
import Panel from './Panel';
import { AssetType, RenderableAssets } from '../utils/constants';

const AssetPanel = ({ panel }) => {
  const { _id } = panel || {};
  const { asset } = useSelector((state) => {
    const { activities } = state;
    const current = activities.current || {};
    const assets = current.assets || [];
    const asset = assets.find((a) => a.panelId === _id && RenderableAssets.includes(a.type));
    return { asset };
  });

  const renderAsset = () => {
    if (asset) {
      switch (asset.type) {
        case AssetType.Stateful:
          return <StatefulAsset asset={asset} />;
        case AssetType.Document:
          return <DocumentAsset asset={asset} />;
        default:
          break;
      }
    }
    return <div />;
  };

  return <Panel panel={panel}>{renderAsset()}</Panel>;
};

export default AssetPanel;
