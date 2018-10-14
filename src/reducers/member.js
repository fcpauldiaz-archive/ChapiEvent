import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          jwt: action.data.jwt,
          email: action.data.email,
        };
      }
      return initialState;
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
