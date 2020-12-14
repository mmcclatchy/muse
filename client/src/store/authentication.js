import { baseApiUrl } from '../config/config';
import { TOKEN_KEY, SET_TOKEN, REMOVE_TOKEN, PUT_USER, SET_USER } from '../store/constants/constants'



export const removeToken = token => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });
export const setUser = payload => ({ type: SET_USER, payload });

export const loadToken = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    dispatch(setToken(token));
  }
};


export const signUp = user => async dispatch => {
  const response = await fetch(`${baseApiUrl}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const { token } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setUser({ token, user }));
  }
}


export const login = (username, password) => async dispatch => {
  const response = await fetch(`${baseApiUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { token, user } = await response.json();
    window.localStorage.setItem(TOKEN_KEY, token);
    dispatch(setUser({ token, user }));
  }
};


export const logout = () => async (dispatch, getState) => {
  window.localStorage.removeItem(TOKEN_KEY);
  dispatch(removeToken());
}


export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case SET_TOKEN: {
      return { ...state, token: payload };
    }
    
    case SET_USER:
      return { ...state, ...payload }

    case REMOVE_TOKEN: {
      const newState = { ...state };
      delete newState.token;
      delete newState.user;
      return newState;
    }
    
    case PUT_USER:
      return { ...state, user: payload.user }

    default: return state;
  }
}
