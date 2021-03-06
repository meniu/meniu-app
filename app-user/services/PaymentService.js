import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';
import { fetchRetry } from './Interceptor';

export default class PaymentService {

    static async initiatePayment(type) {
        let token = await AuthService.retrieveToken();
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
        return fetchRetry(`${Config.apiUrl}/api/Payment`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(objBody)
        });
    }
}