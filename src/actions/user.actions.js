import { userConstants } from '../constants';
import { userService } from '../services/user.service';
import { alertActions } from './';
import { history } from '../helpers';
import {createUserProfileDocument, userLogin, createRequest} from '../firebase-utils';

export const userActions = {
    login,
    logout,
    register,
    raiseRequest,
    getAll,
    delete: _delete
};

function login(name, password) {
    return dispatch => {
        dispatch(request({ name }));
        (async () => {
            await userLogin(name,password)
            .then(function created(userAuth){
                console.log("Sucess "+userAuth)
                var user = {
                    id: name,
                    name: name,
                    firstName: name,
                    lastName: name,
                    token: 'fake-jwt-token'
                }
                console.log(JSON.stringify(user));
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(success(user))
                history.push('/');
              }
            ).catch(function error(error){
                console.log("Error in actions")
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
            })();
        // userService.login(name, password)
        //     .then(
        //         user => { 
        //             dispatch(success(user));
        //             history.push('/');
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    return dispatch => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT });
    }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        console.log("registering user:"+user);
        const name = user.name;
        (async () => {
        await createUserProfileDocument(user, { name })
        .then(function created(userRef){
            console.log("Sucess "+userRef)
            dispatch(success());
            history.push('/login-page');
            dispatch(alertActions.success('Registration successful'));
          }
        ).catch(function error(error){
            console.log("Error in actions")
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        });
        })();
        //userService.register(user);
        
            // .then(
            //     user => { 
            //         dispatch(success());
            //         history.push('/login-page');
            //         dispatch(alertActions.success('Registration successful'));
            //     },
            //     error => {
            //         dispatch(failure(error.toString()));
            //         dispatch(alertActions.error(error.toString()));
            //     }
            // );
    };
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function raiseRequest(requestData) {
    return dispatch => {
        dispatch(request(requestData));
        console.log("raising request :"+requestData);
        (async () => {
        await createRequest(requestData)
        .then(function created(ref){
            console.log("Sucess "+ref)
            dispatch(success(requestData));
            dispatch(alertActions.success('Request Raised Successfully'));
          }
        ).catch(function error(error){
            console.log("Error in actions")
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
        });
        })();
    };
    function request(requestData) { return { type: userConstants.RAISE_REQUEST_REQUEST, requestData } }
    function success(requestData) { return { type: userConstants.RAISE_REQUEST_SUCCESS, requestData } }
    function failure(error) { return { type: userConstants.RAISE_REQUEST_REQUEST_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}