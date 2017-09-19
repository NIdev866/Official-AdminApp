import { 
  NESTED_JOB_SECTORS,
  SELECTED_JOB_SECTOR,
  JOB_TITLES_FROM_MY_SECTOR
} from '../actions/types';

import _ from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case NESTED_JOB_SECTORS:
      return hh = _.mapKeys(action.payload.jobSectors, 'sector_id' }
      return { ...state, [action.payload.jobSectors.sector_id]: action.payload.jobSectors}
    case SELECTED_JOB_SECTOR:
      return { ...state, selectedJobSector: action.payload }
    case JOB_TITLES_FROM_MY_SECTOR:
      return { ...state, jobTitlesFromMySector: action.payload }
    default:
      return state;
  }
}
