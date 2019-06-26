import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";

export default class PromotionService {
  
    static retrievePromotions(){
        return fetch(`${Config.apiUrl}/api/Promotion`);
    }  

    static retrievePromotionsByPartner(partnerId){
        return fetch(`${Config.apiUrl}/api/Promotion/${partnerId}`);
    }  
}