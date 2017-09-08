import { SUBMIT_BANK_DETAILS } from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case SUBMIT_BANK_DETAILS:
            return { ...state, bankDetailsSubmitted: true }
    }

    return state;
}
