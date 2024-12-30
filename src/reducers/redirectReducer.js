import {
  SAVE_REDIRECT_PATH,
  CLEAR_REDIRECT_PATH,
} from "../actions/actionTypes";

const initialState = {
  redirectPath: null,
  allowRedirect: true
};

const redirectReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SAVE_REDIRECT_PATH:
      return {
        ...state,
        redirectPath: action.redirectPath,
        allowRedirect: action.redirectAction,
      };
    case CLEAR_REDIRECT_PATH:
      return { ...state, redirectPath: null, redirectAction: true };

    default:
      return state;
  }
};

export default redirectReducer;
