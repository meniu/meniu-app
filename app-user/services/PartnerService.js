import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from './AuthService';

export default class PartnerService {
  
    static async retrievePartners(){
        let user = await AuthService.retrieveUser();
        return fetch(`${Config.apiUrl}/api/Partner`,{
            headers: {
                'Authorization': 'Bearer '+ user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
              }
        });
    }  
}