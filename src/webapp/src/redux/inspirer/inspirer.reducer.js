import { ACTIONS } from '@/redux/inspirer/inspirer.actions';

export default function (state = {}, action) {
  switch (action.type) {
    case ACTIONS.INSPIRE_ME: {
      return { ...state, loading: true, inspireMeSubjects: action.payload };
    }

    case ACTIONS.INSPIRE_ME_SUCCESS: {
      return {
        ...state, loading: false, error: false, inspireMeRes: action.payload,
      };
    }

    case ACTIONS.INSPIRE_ME_FAILURE: {
      return {
        ...state, loading: false, error: action.payload, inspireMeRes: [],
      };
    }

    default: {
      return state;
    }
  }
}
