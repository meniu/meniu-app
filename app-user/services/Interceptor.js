import fetchIntercept from 'fetch-intercept';
import AuthService from './AuthService';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        return [url, config];
    },

    requestError: function (error) {
        return Promise.reject(error);
    },

    response: async function (response) {
        // Unauthorized case
        if (response.status === 401) {
            console.log('need to refresh token');
            let token = await AuthService.refreshToken();
            //Don't know how to obtain fetch to send it again
        }
        else {
            return response;
        }
    },

    responseError: function (error) {
        return Promise.reject(error);
    }
});