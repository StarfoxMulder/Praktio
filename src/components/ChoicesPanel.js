import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Button from './Button';
import Panel from './Panel';
import { AssetType } from '../utils/constants';
import { setAnswer, setSelected } from '../ducks/quizReducer';

import './ChoicesPanel.scss';

const ChoicesPanel = ({ panel }) => {
  const { _id } = panel || {};
  const dispatch = useDispatch();
  const { outOfTries, selected, selectedAnswer, panelAssets } = useSelector((state) => {
    const { quiz, activities } = state;
    const { assets } = activities.current || {};
    const { outOfTries, selected, selectedAnswer } = quiz;
    const panelAssets = (assets || []).filter((a) => a.panelId === _id);
    return {
      outOfTries,
      selected: selected || [],
      selectedAnswer,
      panelAssets,
    };
  });

  const onChoiceClick = (e) => {
    if (!outOfTries) {
      e.preventDefault();
      const { id } = e.currentTarget.dataset;
      dispatch(setSelected([id]));
    }
  };

  const renderResultDetails = (choice) => {
    if (outOfTries) {
      let resultIcon = null;
      let iconClass = null;
      let incorrectBanner = null;
      if (choice.correct && selected.includes(choice._id)) {
        resultIcon = 'check_circle';
        iconClass = 'correct';
      } else if (
        (choice.correct && !selected.includes(choice._id)) ||
        (!choice.correct && selected.includes(choice._id))
      ) {
        resultIcon = 'add_circle';
        iconClass = 'incorrect';

        let message = null;
        if (choice.correct && !selected.includes(choice._id)) {
          message = (
            <span>
              <span>
                You didn&apos;t select this <span className="correct-badge">correct</span> answer.
              </span>
              <span className="review"></span>
            </span>
          );
        } else if (!choice.correct && selected.includes(choice._id)) {
          message = (
            <span>
              <span>
                You selected this <span className="incorrect-badge">incorrect</span> answer.
              </span>
              <span className="review"></span>
            </span>
          );
        }

        incorrectBanner = (
          <div className={classNames('incorrect-banner')} key="incorrect">
            <div className={classNames('message')}>{message}</div>
            <div className="graphic d-flex flex-row justify-content-end">
              <svg viewBox="0 0 60 20">
                <polygon className="triangle" points="0,0 50,0 25,18" />
              </svg>
            </div>
          </div>
        );
      }

      const resultDetails = [];
      if (incorrectBanner) {
        resultDetails.push(incorrectBanner);
      }

      if (resultIcon) {
        resultDetails.push(
          <i key="result-icon" className={classNames('choice-badge material-icons', iconClass)}>
            {resultIcon}
          </i>,
        );
      }

      if (resultDetails.length > 0) {
        return resultDetails;
      }
    }

    return null;
  };

  const renderChoices = () => {
    const choices = panelAssets.filter((a) => a.type === AssetType.Choice);
    let answerFound = false;
    return choices.map((c) => {
      const unfocused =
        outOfTries && selectedAnswer && selectedAnswer._id !== c._id ? 'unfocused' : null;

      const resultDetails = renderResultDetails({
        ...c,
        correct: answerFound ? false : c.correct,
      });

      if (c.correct) {
        answerFound = true;
      }

      return (
        <div
          key={c._id}
          className={classNames('vertical-choice-container', {
            selected: selected.includes(c._id),
            'out-of-tries': !!outOfTries,
            unfocused,
          })}
        >
          <div
            data-id={c._id}
            className={classNames('vertical-choice', {
              selected: selected.includes(c._id),
              unfocused,
            })}
            onClick={!outOfTries ? onChoiceClick : null}
          >
            <div className="content">{c.content}</div>
          </div>
          {resultDetails}
          {outOfTries && (
            <Button
              btnStyle="primary"
              className="why-button"
              onClick={() => dispatch(setAnswer(c))}
              active={selectedAnswer && selectedAnswer._id === c._id}
            >
              ?
            </Button>
          )}
        </div>
      );
    });
  };

  const choices = renderChoices();
  const classes = ['ChoicesPanel'];
  return (
    <Panel panel={panel} classes={classes}>
      <div className="choices-wrapper">{choices}</div>
    </Panel>
  );
};

export default ChoicesPanel;
