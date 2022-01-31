import actionTypes from './action-types';

export function setLoading(value){
  return {
    type: actionTypes.SET_LOADING,
    payload: value,
  };
}

export function setActiveUser(value){
  return {
    type: actionTypes.SET_ACTIVE_USER,
    payload: value,
  };
}

export function setUser(value){
  return {
    type: actionTypes.SET_USER,
    payload: value,
  };
}

export function setDailyResult(value){
  return {
    type: actionTypes.SET_DAILY_RESULTS,
    payload: value,
  };
}
