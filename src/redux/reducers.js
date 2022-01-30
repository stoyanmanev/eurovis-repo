import actionTypes from "./action-types";
import {combineReducers} from "redux";

export function isLoading(state = false, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return action.payload;
    default:
      return state
  }
}

export function isActiveUser(state = false, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_USER:
      return action.payload;
    default:
      return state
  }
}

export function isUser(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state
  }
}


export default combineReducers({ 
    isUser,
    isLoading,
    isActiveUser,
})