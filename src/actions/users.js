import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import network from './network_service';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function signUp(formData) {
  const { email, firstName, lastName, token } = formData;

  return async (dispatch) => {
    // Validation checks
    if (!firstName) throw ErrorMessages.missingFirstName;
    if (!lastName) throw ErrorMessages.missingLastName;
    if (!email) throw ErrorMessages.missingEmail;
    if (!token) throw ErrorMessages.missingToken;
    if (!validateEmail(email)) throw ErrorMessages.invalidEmail;

    await statusMessage(dispatch, 'loading', true);
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      token,
    };
    try {
      await network.createUser(user);
      const result = await network.loginUser({ email });
      await statusMessage(dispatch, 'loading', false);
      dispatch({
        type: 'USER_LOGIN',
        data: {
          jwt: result.token,
          email,
        },
      });
    } catch (err) {
      await statusMessage(dispatch, 'loading', false);
      console.log(err);
      throw err.message;
    }
  };
}


/**
 * Get this events data
 */
export function getEventsData(day) {
  return async (dispatch) => {
    try {
      await statusMessage(dispatch, 'loading', true);
      const events = await network.getEvents(day);
      await statusMessage(dispatch, 'loading', false);
      dispatch({ type: 'EVENTS_RETRIEVE', payload: events });
      return events;
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: [
          {
            error: err.message,
          },
        ],
      });
      return [];
    }
  };
}

export function getMemberData() {
  return () => new Promise(resolve => resolve());
}

/**
 * Login
 */
export function login(formData) {
  const { email } = formData;

  return async (dispatch) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) throw ErrorMessages.missingEmail;
    try {
      const result = await network.loginUser(formData);
      if ('errmsg' in result) {
        await statusMessage(dispatch, 'error', result.errmsg);
        throw result.errmsg;
      }
      await statusMessage(dispatch, 'loading', false);
      return dispatch({
        type: 'USER_LOGIN',
        data: {
          jwt: result.token,
          username: result.username,
          email,
        },
      });
    } catch (err) {
      await statusMessage(dispatch, 'error', err.message);
      throw err.message;
    }
  };
}

/**
 * Loading
 */
export function loading() {
  return dispatch => new Promise(async (resolve, reject) => {
    setTimeout(() => {}, 3000);
    await statusMessage(dispatch, 'loading', false);

    return {};
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

/**
 * Logout
 */
export function logout() {
  return dispatch => new Promise((resolve) => {
    resolve(dispatch({ type: 'USER_RESET' }));
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}
