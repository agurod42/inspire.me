import axios from 'axios';

export const ACTIONS = {
  INSPIRE_ME: 'INSPIRE_ME',
  INSPIRE_ME_SUCCESS: 'INSPIRE_ME_SUCCESS',
  INSPIRE_ME_FAILURE: 'INSPIRE_ME_FAILURE',
};

export function inspireMe(torreBio) {
  let subjects = [
    ...torreBio.education.map(e => e.name).join(' ').split(' '),
    ...torreBio.jobs.map(j => j.role).join(' ').split(' '),
    ...torreBio.person.professionalHeadline.split(' '),
    ...torreBio.strengths.map(s => s.name).join(' ').split(' '),
  ];

  subjects = subjects.filter((s, pos) => s.length > 4 && subjects.indexOf(s) === pos);

  return async (dispatch) => {
    dispatch({ type: ACTIONS.INSPIRE_ME, payload: subjects });
    try {
      const res = await axios.get(`${process.env.API_URL}:8091/v1/inspire-me?subjects=${subjects.join(',')}`);
      dispatch({ type: ACTIONS.INSPIRE_ME_SUCCESS, payload: res.data.result });
    } catch (err) {
      dispatch({ type: ACTIONS.INSPIRE_ME_FAILURE, payload: err });
    }
  };
}
