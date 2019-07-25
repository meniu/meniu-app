import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';

export default class PromotionService {

    static async retrievePromotions() {
        let token = await AuthService.retrieveToken();
        return fetch(`${Config.apiUrl}/api/Promotion`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }

    static async retrievePromotionsByUser() {
        let token = await AuthService.retrieveToken();
        let user = await AuthService.retrieveUser();
        // console.log(`${Config.apiUrl}/api/Promotion?userEmail=${user.applicationUser.email}`);
        return fetch(`${Config.apiUrl}/api/Promotion?userEmail=${user.applicationUser.email}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }

    static async retrievePromotionsByPartner(partnerId) {
        let token = await AuthService.retrieveToken();
        return fetch(`${Config.apiUrl}/api/Promotion/${partnerId}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
    }

    static async generateQR(couponType, partnerIdentification, promotionCouponId){  
        let token = await AuthService.retrieveToken();      
        let user = await AuthService.retrieveUser();

        if(!user.comboCouponPlan || !user.comboCouponPlan.couponPlans)
            throw new Error("No coupon plan for user");
        let objBody = {
            userEmail: user.applicationUser.email,
            couponType,
            planType: user.comboCouponPlan.couponPlans[0].plan.type,
            partnerIdentification,
            promotionCouponId,
            comboType: user.comboCouponPlan.combo.type
        }
        return fetch(`${Config.apiUrl}/api/Promotion/Generate/Code`, {
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