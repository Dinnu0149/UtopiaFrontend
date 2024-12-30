import {
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE,
  CLEAR_UPDATE_RESPONSE,
  DELETEUSER_REQUEST,
  DELETEUSER_SUCCESS,
  DELETEUSER_FAILURE,
  SETTING_REQUEST,
  SETTING_SUCCESS,
  SETTING_FAILURE,
  EDITSETTING_REQUEST,
  EDITSETTING_SUCCESS,
  EDITSETTING_FAILURE,
  CLEAR_SETTING_RESPONSE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: {},
  editLoading: false,
  editError: null,
  editResponse: null,
  deleteLoading: false,
  deleteError: null,
  deleteResponse: null,
  settingLoading: false,
  settingError: null,
  settingResponse: {},
  editSettingLoading: false,
  editSettingError: null,
  editSettingResponse: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case PROFILE_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EDITPROFILE_REQUEST:
      return {
        ...state,
        editLoading: true,
        editResponse: null,
        editError: null,
      };

    case EDITPROFILE_SUCCESS:
      return { ...state, editLoading: false, editResponse: action.payload };

    case EDITPROFILE_FAILURE:
      return { ...state, editLoading: false, editError: action.payload };

    case CLEAR_UPDATE_RESPONSE:
      return { ...state, editResponse: null };

    case DELETEUSER_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null };

    case DELETEUSER_SUCCESS:
      return { ...state, deleteLoading: false, deleteResponse: action.payload };

    case DELETEUSER_FAILURE:
      return { ...state, deleteLoading: false, deleteError: action.payload };

      case SETTING_REQUEST:
        return { ...state, settingLoading: true, settingError: null };
  
      case SETTING_SUCCESS:
        return { ...state, settingLoading: false, settingResponse: action.payload };
  
      case SETTING_FAILURE:
        return { ...state, settingLoading: false, settingError: action.payload };
  
      case EDITSETTING_REQUEST:
        return {
          ...state,
          editSettingLoading: true,
          editSettingResponse: null,
          editSettingError: null,
        };
  
      case EDITSETTING_SUCCESS:
        return { ...state, editSettingLoading: false, editSettingResponse: action.payload };
  
      case EDITSETTING_FAILURE:
        return { ...state, editSettingLoading: false, editSettingError: action.payload };

      case CLEAR_SETTING_RESPONSE:
          return { ...state, editSettingResponse: null, editSettingError: null };

    default:
      return state;
  }
};

export default profileReducer;
