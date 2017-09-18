import { 
  JOB_SECTORS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case JOB_SECTORS:
      return { ...state, jobSectors: action.payload }
    default:
      return state;
  }
}
