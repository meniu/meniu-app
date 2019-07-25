import Config from "../constants/Config";
import AuthService from "./AuthService";
import { fetchRetry } from './Interceptor';

export default class AccountService {
    static async retrieveUserGet() {
        try {
            let user = await AuthService.retrieveUser();
            console.log('user in local', user.id);
            let token = await AuthService.retrieveToken();
            return fetchRetry(`${Config.apiUrl}/api/Account/${user.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            });
        }
        catch {
            console.log('Async stoeage error');
        }
    }
}