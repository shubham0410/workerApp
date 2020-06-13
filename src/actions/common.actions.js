import { commonConstants } from '../constants';
import { alertActions } from './';
import { commonService } from 'services';

export const commonActions = {
    submitContactUsForm
};

function submitContactUsForm(user) {
    return dispatch => {
        dispatch(request(user));
        commonService.submitContactUs(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(alertActions.success('Request Received. Team Will contact you soon.'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request(user) { return { type: commonConstants.CONTACT_US_REQUEST, user } }
    function success(user) { return { type: commonConstants.CONTACT_US_SUCCESS, user } }
    function failure(error) { return { type: commonConstants.CONTACT_US_FAILURE, error } }
}