import { ACTIONS } from '@/redux/torre/torre.actions';

export default function (state = {}, action) {
    switch (action.type) {
        
        case ACTIONS.TORRE_BIO: {
            return { ...state, loading: true }
        }
        
        case ACTIONS.TORRE_BIO_SUCCESS: {
            return { ...state, loading: false, error: false, torreBio: action.payload }
        }
        
        case ACTIONS.TORRE_BIO_FAILURE: {
            return { ...state, loading: false, error: action.payload, torreBio: undefined }
        }

        default: {
            return state
        }

    }
}