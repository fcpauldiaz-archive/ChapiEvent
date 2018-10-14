import ErrorMessages from '../constants/errors';
import statusMessage from './status';

export function registroHoras(formData) {
  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);
    return {};
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

export function signUp(formData) {
  const { email, firstName, lastName } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!firstName) return reject({ message: ErrorMessages.missingFirstName });
    if (!lastName) return reject({ message: ErrorMessages.missingLastName });
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
    };
    fetch('https://chapievent.chapilabs.com/api/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(user),
    }).then(async (res) => {
      if (res.ok) {
        const loginData = {
          email,
        };
        fetch('https://chapievent.chapilabs.com/api/users/login', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify(loginData)
        }).then(result => result.json())
          .then(async (result) => {
            await statusMessage(dispatch, 'loading', false);
            return resolve(dispatch({
              type: 'USER_LOGIN',
              data: {
                jwt: result.token,
                email,
              },
            }));
          }).catch(reject);
      } else {
        await statusMessage(dispatch, 'loading', false);
        return reject({ message: 'El correo ya está registrado' });
      }
    }).catch(reject);
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}


/**
 * Get this events data
 */
export function getEventsData(day) {
  return async (dispatch) => {
    try {
      let events = await fetch('https://chapievent.chapilabs.com/api/events?day=' + day);
      events = await events.json();
      dispatch({ type: 'EVENTS_RETRIEVE', payload: events });
      return events;
    } catch (err) {
      dispatch({
        type: 'USER_ERROR',
        payload: [
          {
            error: err.message
          }
        ]
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

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    fetch('https://chapievent.chapilabs.com/api/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(formData)
    })
      .then(result => result.json())
      .then(async (result) => {
        if ('errmsg' in result) {
          await statusMessage(dispatch, 'error', result.errmsg);
          return reject({ message: result.errmsg });
        }
        await statusMessage(dispatch, 'loading', false);
        return resolve(dispatch({
          type: 'USER_LOGIN',
          data: {
            jwt: result.token,
            username: result.username,
            email,
          },
        }));
      });
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

/**
 * Reset Password
 */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    return {};
  }).catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);
    throw err.message;
  });
}

/**
 * Loading
 */
export async function loading() {
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
