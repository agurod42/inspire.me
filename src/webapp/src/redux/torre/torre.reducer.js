import { ACTIONS } from '@/redux/torre/torre.actions';

export default function (state = {}, action) {
    switch (action.type) {
        
        case ACTIONS.TORRE_PEOPLE: {
            return { ...state, loading: true }
        }
        
        case ACTIONS.TORRE_PEOPLE_SUCCESS: {
            return { ...state, loading: false, error: false, torrePeople: action.payload }
        }
        
        case ACTIONS.TORRE_PEOPLE_FAILURE: {
            return { ...state, loading: false, error: action.payload, torrePeople: undefined }
        }

        default: {
            return state
        }

    }
}