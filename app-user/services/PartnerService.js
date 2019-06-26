import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";

export default class PartnerService {
  
    static retrievePartners(){
        return fetch(`${Config.apiUrl}/api/Partner`);
    }  
}