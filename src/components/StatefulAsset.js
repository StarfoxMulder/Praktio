import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import SpeechBubble from './SpeechBubble';
import Button from './Button';

import './StatefulAsset.scss';

const DefaultStateType = 'default';

const StatefulAsset = ({ asset }) => {
  const { stateType, selectedAnswer, outOfTries } = useSelector((state) => {
    const { quiz } = state;
    const { stateType, selectedAnswer, outOfTries } = quiz;
    return { stateType, selectedAnswer, outOfTries };
  });

  const [initialOnly, setInitialOnly] = useState(false);
  const [toggleClicked, setToggleClicked] = useState(false);
  const { images, referenceContent, initialGreeting } = asset || {};
  const overlayExperience = outOfTries && initialGreeting && selectedAnswer;
  const currentStateType = overlayExperience ? DefaultStateType : stateType || DefaultStateType;
  const image = (images || []).find((f) => f.stateType === currentStateType);
  const url = image ? image.url : '';
  const buttonText = initialOnly ? 'Back To Explanation' : 'Back To Prompt';
  const overlayText = overlayExperience ? (selectedAnswer || {}).explanation : '';
  const overlay = overlayExperience ? (
    <div className="panel-overlay">
      <div className="overlay-dialog-max">
        <div className="overlay-dialog-container">
          <div className="overlay-dialog">
            {initialOnly && <div className="panel-overlay"></div>}
            {overlayText}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  const overlayBackButton = overlayExperience ? (
    <Button
      btnStyle="primary"
      className="overlay-button"
      onClick={() => {
        setToggleClicked(true);
        setInitialOnly(!initialOnly);
      }}
    >
      <i className="fas fa-chevron-left" />
      {buttonText}
    </Button>
  ) : null;

  const overlayStyle = {
    zIndex: initialOnly ? 3 : 0,
  };

  const imageWrapper = (
    <div className="image-wrapper">
      <img src={url} alt={stateType} className="stateful-image" style={overlayStyle} />
    </div>
  );

  const statefulContainer = (
    <div className="StatefulAsset">
      {!referenceContent && overlay}
      <SpeechBubble
        initialOnly={initialOnly}
        toggleClicked={toggleClicked || overlayExperience}
        characterId={asset._id}
        asset={asset}
      />
      {asset && asset.images && imageWrapper}
      {!referenceContent && overlayBackButton}
    </div>
  );

  if (!referenceContent) {
    return statefulContainer;
  }

  return (
    <div className="split-panel">
      {overlay}
      <div className="top-split" style={overlayStyle}>
        {statefulContainer}
      </div>
      <div className="bottom-split" style={overlayStyle}>
        <div
          className="reference-content"
          dangerouslySetInnerHTML={{
            __html: (referenceContent || {}).content || '',
          }}
        />
      </div>
      {overlayBackButton}
    </div>
  );
};

export default StatefulAsset;
