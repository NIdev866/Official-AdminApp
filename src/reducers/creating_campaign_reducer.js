import { 
  JOB_SECTORS,
  SELECTED_JOB_SECTOR,
  JOB_TITLES_FROM_MY_SECTOR
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case JOB_SECTORS:
      return { ...state, jobSectors: action.payload }
    case SELECTED_JOB_SECTOR:
      return { ...state, selectedJobSector: action.payload }
    case JOB_TITLES_FROM_MY_SECTOR:
      return { ...state, jobTitlesFromMySector: action.payload }
    default:
      return state;
  }
}
