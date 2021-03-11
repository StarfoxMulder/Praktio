import React from 'react';
import { useSelector } from 'react-redux';

import './Instructions.scss';

const Instructions = () => {
  const { remaining, showTryAgain, outOfTries, stateType, plural, activity } = useSelector(
    (state) => {
      const { quiz, activities } = state;
      const activity = activities.current;
      const numTries = (activity || {}).tries || 0;
      const { tries, outOfTries, showTryAgain, stateType } = quiz;
      return {
        remaining: numTries - tries,
        showTryAgain,
        outOfTries,
        stateType,
        plural: true,
        activity,
      };
    },
  );

  if (!activity) {
    return null;
  }

  const instructions = activity.instructions || 'Default instructions';
  let triesText = remaining > 1 ? 'tries' : 'try';
  let messageClass = '';
  let message = `You have ${remaining} ${triesText}.`;
  if (stateType === 'correct') {
    messageClass = 'correct';
    message = `You're correct! Review the explanation${plural ? 's' : ''}.`;
  } else if (outOfTries) {
    messageClass = 'incorrect';
    message = `You're incorrect. Review the explanation${plural ? 's' : ''}.`;
  } else if (showTryAgain) {
    messageClass = 'try-again';
    message = `Try again. You have ${remaining} ${triesText} left.`;
  }
  return (
    <div className={`Instructions ${messageClass}`}>
      <div className="instructions-text">
        {!outOfTries && instructions}
        <span className="bold"> {message}</span>
      </div>
    </div>
  );
};

export default Instructions;
