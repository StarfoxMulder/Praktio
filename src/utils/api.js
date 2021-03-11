import axios from './mock/axios';

export const getActivity = async () => {
  return axios.get(`/activities/`);
};

export const getNextActivity = async ({ activityId }) => {
  return axios.get(`/activities/${activityId || ''}/next`);
};

export const getPreviousActivity = async ({ activityId }) => {
  return axios.get(`/activities/${activityId || ''}/previous`);
};

export const submitSelections = async ({ activityId, selected }) => {
  return axios.post(`/activities/${activityId}`, { selected });
};
