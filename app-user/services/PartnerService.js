import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";

export default class PartnerService {
  
    static async retrievePartners(){
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        return fetch(`${Config.apiUrl}/api/Partner`,{
            headers: {
                'Authorization': 'Bearer '+ user.applicationUser.token,
                'Accept': 'application/json',
                'Content-type': 'application/json'
              }
        });
    }  
}