import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import AuthService from "./AuthService";

export default class PromotionService {
    static async readCode(codeContent) {
      let objBody = {
        codeContent
      }
      let token = await AuthService.retrieveToken();
      return fetch(`${Config.apiUrl}/api/Promotion/Read/Code`, {
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