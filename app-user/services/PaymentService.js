import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';

export default class PaymentService {

    static async initiatePayment(type) {
        let user = await AuthService.retrieveUser();
        let objBody = {
            userEmail: {
                applicationUser: {
                    userName: user.applicationUser.email
                }
            },
            comboCouponPlan: {
                combo: {
                    type
                }
            }
        };
        return fetch(`${Config.apiUrl}/api/Payment`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(objBody)
        });
    }
}