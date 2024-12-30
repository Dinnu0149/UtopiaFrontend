import {
    DISPLAY_MESSAGE,
    CLEAR_MESSAGE,
  } from "./actionTypes";

  export const displayMessage = (message, color) => ({
    type: DISPLAY_MESSAGE,
    receiveMessage: message,
    receiveColor: color
  });
  
  export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
  });