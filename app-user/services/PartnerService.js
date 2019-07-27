import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';
import { fetchRetry } from './Interceptor';

export default class PartnerService {

    static async retrievePartners() {

        let token = await AuthService.retrieveToken();
        return fetchRetry(`${Config.apiUrl}/api/Partner`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }
}