import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";

export default class AuthService {
  static logIn(username, password) {
    let objBody = {
      username,
      password
    }
    return fetch(`${Config.apiUrl}/api/Account/Login/User`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(objBody)
    });
  }

  static externalLogIn(authType, email) {
    const acceptTermsAndConditions = true;
    let objBody = {
      email,
      authType,
      acceptTermsAndConditions
    };
    return fetch(`${Config.apiUrl}/api/Account/ExternalLogin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(objBody)
    });
  }

  static registerUser(email, name, lastName, password, confirmPassword, acceptTermsAndConditions) {
    const accountType = "User";
    let objBody = {
      email,
      name,
      lastName,
      password,
      confirmPassword,
      accountType,
      acceptTermsAndConditions
    };
    console.log("Se enviará", { objBody }, `a la url: ${Config.apiUrl}/api/Account/Register`);

    return fetch(`${Config.apiUrl}/api/Account/Register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(objBody)
    });
  }

  static saveUserLocally(user) {
    try {
      AsyncStorage.setItem('user', JSON.stringify(user));
      if (Platform.OS === 'android')
        ToastAndroid.show('Bienvenido, ' + user.name, ToastAndroid.SHORT);
      this.props.navigation.navigate("Main");
    } catch (error) {
      // Error saving data
      console.log({ error });

    }
  }

  static retrieveUser() {

  }

  /**
   * Erases user from local storage. after this, use callback
   * component takes care of navigation to homescreen through callback
   */
  static logOut(callBack) {
    AsyncStorage.removeItem("user", callBack);
  }


}