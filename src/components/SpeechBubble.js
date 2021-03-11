import React from 'react';
import { useSelector } from 'react-redux';

import './SpeechBubble.scss';

const SpeechBubble = ({ initialOnly, toggleClicked, asset }) => {
  const { outOfTries, selectedAnswer } = useSelector((state) => {
    const { quiz } = state;
    const { outOfTries, selectedAnswer } = quiz;
    return { outOfTries, selectedAnswer };
  });

  const { initialGreeting } = asset || {};
  let content = initialGreeting || '';
  if (outOfTries) {
    content = 'Click the explanation button for each choice to see an explanation here.';
    if (selectedAnswer && !initialGreeting) {
      content = selectedAnswer.explanation;
    }

    if (toggleClicked && initialGreeting) {
      content = initialGreeting;
    }
  }

  const zIndex = initialOnly ? 3 : 0;
  return (
    <div
      className="SpeechBubble"
      style={{
        zIndex,
      }}
    >
      <div className="bubble-content">{content}</div>
      <div className="bubble-pointer" />
    </div>
  );
};

export default SpeechBubble;
