import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';

export default class PromotionService {

    static async retrievePromotions() {
        let user = await AuthService.retrieveUser();
        return fetch(`${Config.apiUrl}/api/Promotion`, {
            headers: {
                'Authorization': 'Bearer ' + user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }

    static async retrievePromotionsByUser() {
        let user = await AuthService.retrieveUser();
        return fetch(`${Config.apiUrl}/api/Promotion?userEmail=${user.applicationUser.email}`, {
            headers: {
                'Authorization': 'Bearer ' + user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }

    static async retrievePromotionsByPartner(partnerId) {
        let user = await AuthService.retrieveUser();
        return fetch(`${Config.apiUrl}/api/Promotion/${partnerId}`, {
            headers: {
                'Authorization': 'Bearer ' + user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }
}