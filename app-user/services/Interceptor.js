import AuthService from './AuthService';

export function fetchRetry (url, fetchOptions = {}) {
    return new Promise((resolve, reject) => {
        async function success(response) {
            if(response.status === 401){
                // console.log('entré a actualizar el token');
                let newToken = await AuthService.refreshToken();
                fetchOptions.headers.Authorization = 'Bearer ' + newToken;
                retryFetchUrl();
            }
            else{
                resolve(response);
            }            
        }
        function successRetried(response) {
            resolve(response);
        }
        function failure(error) {
            reject(error);
        }
        function finalHandler(finalError) {
            throw finalError;
        }
        async function fetchUrl() {
            return fetch(url, fetchOptions)
                .then(success)
                .catch(failure)
                .catch(finalHandler);
        }
        async function retryFetchUrl() {
            return fetch(url, fetchOptions)
                .then(successRetried)
                .catch(failure)
                .catch(finalHandler);
        }
        fetchUrl();
    });
};