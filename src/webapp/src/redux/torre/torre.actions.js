import axios from 'axios';

export const ACTIONS = {
  TORRE_PEOPLE: 'TORRE_PEOPLE',
  TORRE_PEOPLE_SUCCESS: 'TORRE_PEOPLE_SUCCESS',
  TORRE_PEOPLE_FAILURE: 'TORRE_PEOPLE_FAILURE',
};

export function people(username) {
  return async (dispatch) => {
    dispatch({ type: ACTIONS.TORRE_PEOPLE });
    try {
      const res = await axios.get(`${process.env.API_URL}:8090/v1/people?q=${username}`);
      dispatch({ type: ACTIONS.TORRE_PEOPLE_SUCCESS, payload: res.data.result });
    } catch (err) {
      dispatch({ type: ACTIONS.TORRE_PEOPLE_FAILURE, payload: err });
    }
  };
}
