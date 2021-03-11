import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { isEqual } from 'lodash';
import { AssetType, QuizState } from '../constants';

import Activities from './activities';

const userData = {};
const mock = new MockAdapter(axios);
const getActivityFromUrl = (url) => {
  const lastSlashIndex = url.lastIndexOf('/');
  const activityId = url.substring(lastSlashIndex + 1);
  const activity = Activities.find((a) => a._id === activityId);
  return activity;
};

mock.onGet(/\/activities\/.+\/next/).reply((config) => {
  const url = config.url.substring(0, config.url.length - 5);
  const priorActivity = getActivityFromUrl(url);
  if (!priorActivity) {
    return [404];
  }

  const index = Activities.findIndex((a) => a._id === priorActivity._id);
  const activity = Activities[index + 1];
  if (activity) {
    const data = userData[activity._id] || {
      total: Activities.length,
    };

    data.number = index + 2;
    return [200, { ...activity, userData: { ...data } }];
  } else {
    return [404];
  }
});

mock.onGet(/\/activities\/.+\/previous/).reply((config) => {
  const url = config.url.substring(0, config.url.length - 9);
  const priorActivity = getActivityFromUrl(url);
  if (!priorActivity) {
    return [404];
  }

  const index = Activities.findIndex((a) => a._id === priorActivity._id);
  const activity = Activities[index - 1];
  if (activity) {
    const data = userData[activity._id] || {
      total: Activities.length,
    };

    data.number = index;
    return [200, { ...activity, userData: { ...data } }];
  } else {
    return [404];
  }
});

mock.onGet('/activities/').reply(() => {
  const activity = Activities.find((a) => a._id === '1');
  if (activity) {
    const data = userData[activity._id] || {
      number: 1,
      total: Activities.length,
    };
    return [200, { ...activity, userData: { ...data } }];
  } else {
    return [404];
  }
});

mock.onPost(/\/activities\/.+/).reply((config) => {
  const bodyData = JSON.parse(config.data);
  const activity = getActivityFromUrl(config.url);
  if (activity) {
    const { assets, isSingle, _id } = activity;
    const index = Activities.findIndex((a) => a._id === _id);
    const answers = assets.filter((a) => a.type === AssetType.Choice);
    let correctSelected = false;
    let selectedValue = bodyData.selected;
    if (isSingle) {
      const selected = selectedValue && selectedValue.length ? selectedValue[0] : null;
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        if (answer.correct) {
          correctSelected = answer._id === selected;
          break;
        }
      }
    } else {
      const correctAnswerIds = answers.filter((a) => a.correct).map((a) => a._id);
      correctSelected = isEqual([...selectedValue].sort(), correctAnswerIds.sort());
    }

    const data = userData[activity._id] || {
      number: index + 1,
      total: Activities.length,
    };
    const tries = (data.tries || 0) + 1;
    const outOfTries = tries >= activity.tries || correctSelected;
    userData[activity._id] = {
      ...data,
      tries,
      correct: correctSelected,
      stateType: outOfTries
        ? correctSelected
          ? QuizState.Correct
          : QuizState.AllWrong
        : tries > 0
        ? QuizState.SomeWrong
        : undefined,
      showTryAgain: tries > 0,
      outOfTries,
      disableNext: !outOfTries || activity._id === '3',
      disablePrevious: activity._id === '1',
      selected: bodyData.selected,
    };
    return [200, { ...activity, userData: userData[activity._id] }];
  } else {
    return [404];
  }
});

export default axios;
