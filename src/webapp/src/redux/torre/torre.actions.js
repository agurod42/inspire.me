import axios from 'axios';

export const ACTIONS = {
    TORRE_BIO: 'TORRE_BIO',
    TORRE_BIO_SUCCESS: 'TORRE_BIO_SUCCESS',
    TORRE_BIO_FAILURE: 'TORRE_BIO_FAILURE'
};

export function bio(username) {
    return async (dispatch) => {
        dispatch({ type: ACTIONS.TORRE_BIO });
        try {
            const res = await axios.get(`${process.env.API_URL}:8090/v1/bio?username=${username}`);
            dispatch({ type: ACTIONS.TORRE_BIO_SUCCESS, payload: res.data.result });
        }
        catch (err) {
            dispatch({ type: ACTIONS.TORRE_BIO_FAILURE, payload: err });
        }
    };
}