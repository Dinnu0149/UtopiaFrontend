import {
  ORGANIZATION_REQUEST,
  ORGANIZATION_SUCCESS,
  ORGANIZATION_FAILURE,
  EDITORGANIZATION_REQUEST,
  EDITORGANIZATION_SUCCESS,
  EDITORGANIZATION_FAILURE,
  CLEAR_ORGANIZATIONUPDATE_RESPONSE,
  ORGANIZATION_GETWITHDRAWALINFO_FAILURE,
  ORGANIZATION_GETWITHDRAWALINFO_SUCCESS,
  ORGANIZATION_GETWITHDRAWALINFO_REQUEST,
  ORGANIZATION_EDITWITHDRAWALINFO_FAILURE,
  ORGANIZATION_EDITWITHDRAWALINFO_SUCCESS,
  ORGANIZATION_EDITWITHDRAWALINFO_REQUEST,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  response: [],
  editLoading: false,
  editError: null,
  editResponse: null,
  withdrawResponse: null,
  withdrawLoading: false,
  withdrawError: null,
  getWithdrawResponse: null,
  getWithdrawLoading: false,
  getWithdrawError: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORGANIZATION_REQUEST:
      return { ...state, loading: true, error: null, editResponse: null };

    case ORGANIZATION_SUCCESS:
      return { ...state, loading: false, response: action.payload };

    case ORGANIZATION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case EDITORGANIZATION_REQUEST:
      return {
        ...state,
        editLoading: true,
        editResponse: null,
        editError: null,
      };

    case EDITORGANIZATION_SUCCESS:
      return { ...state, editLoading: false, editResponse: action.payload };

    case EDITORGANIZATION_FAILURE:
      return { ...state, editLoading: false, editError: action.payload };

    case CLEAR_ORGANIZATIONUPDATE_RESPONSE:
      return { ...state, editResponse: null, editError: null, withdrawResponse: null, withdrawError: null };

      case ORGANIZATION_GETWITHDRAWALINFO_REQUEST:
        return {
          ...state,
          getWithdrawLoading: true,
          withdrawResponse: null,
          withdrawError: null,
          getWithdrawResponse: null,
          getWithdrawError: null,
        };
  
      case ORGANIZATION_GETWITHDRAWALINFO_SUCCESS:
        return { ...state, getWithdrawLoading: false, getWithdrawResponse: action.payload };
  
      case ORGANIZATION_GETWITHDRAWALINFO_FAILURE:
        return { ...state, getWithdrawLoading: false, getWithdrawError: action.payload };

        case ORGANIZATION_EDITWITHDRAWALINFO_REQUEST:
          return {
            ...state,
            withdrawLoading: true,
            withdrawResponse: null,
            withdrawError: null,
          };
    
        case ORGANIZATION_EDITWITHDRAWALINFO_SUCCESS:
          return { ...state, withdrawLoading: false, withdrawResponse: action.payload };
    
        case ORGANIZATION_EDITWITHDRAWALINFO_FAILURE:
          return { ...state, withdrawLoading: false, withdrawError: action.payload };

    default:
      return state;
  }
};

export default profileReducer;
