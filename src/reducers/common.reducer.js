import { userConstants, commonConstants } from '../constants';

export function common(state = {}, action) {
  switch (action.type) {
    case commonConstants.CONTACT_US_REQUEST:
      return { submitted: true };
      case commonConstants.CONTACT_US_SUCCESS:
      return {submitted:false};
     case commonConstants.CONTACT_US_FAILURE:
      return {submitted:false};
    default:
      return state
  }
}