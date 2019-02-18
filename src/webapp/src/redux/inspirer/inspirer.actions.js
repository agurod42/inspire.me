import axios from 'axios';

export const ACTIONS = {
    INSPIRE_ME: 'INSPIRE_ME',
    INSPIRE_ME_SUCCESS: 'INSPIRE_ME_SUCCESS',
    INSPIRE_ME_FAILURE: 'INSPIRE_ME_FAILURE'
};

export function inspireMe(torreBio) {
    return async (dispatch) => {
        dispatch({ type: ACTIONS.INSPIRE_ME });
        try {
            const subjects = ['software'];
            const res = await axios.get(`${process.env.API_URL}:8091/v1/inspire-me?subjects=${subjects.join(',')}`);
            dispatch({ type: ACTIONS.INSPIRE_ME_SUCCESS, payload: res.data.result });
        }
        catch (err) {
            dispatch({ type: ACTIONS.INSPIRE_ME_FAILURE, payload: err });
        }
    };
}