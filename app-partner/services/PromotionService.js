import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";

export default class PromotionService {
    static readCode(codeContent) {
      let objBody = {
        codeContent
      }
      return fetch(`${Config.apiUrl}/api/Promotion/Read/Code`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(objBody)
      });
    } 
  }