import { DISPLAY_MESSAGE, CLEAR_MESSAGE } from "../actions/actionTypes";

const initialState = {
  processing: false,
  renderMessage: null,
  renderColor: null
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return { ...state, processing: true, renderMessage: action.receiveMessage, renderColor: action.receiveColor};

    case CLEAR_MESSAGE:
      return { ...state, processing: false, renderMessage: null, renderColor: null };

    default:
      return state;
  }
};

export default messageReducer;
