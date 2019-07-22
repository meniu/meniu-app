import Config from "../constants/Config";
import { AsyncStorage, Platform, ToastAndroid } from "react-native";
import { NetInfo, Alert } from "react-native";

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

  static async retrieveUserGet() {
    let token = await this.retrieveToken();
    return fetch(`${Config.apiUrl}/api/Account/${user.id}`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
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
    // console.log("Se enviará", { objBody }, `a la url: ${Config.apiUrl}/api/Account/Register`);

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
      // console.log({ error });

    }
  }

  static saveTokenLocally(token, refreshToken) {
    let tokenObject = {
      token,
      refreshToken
    };
    try {
      AsyncStorage.setItem('token', JSON.stringify(tokenObject));
    } catch (error) {
      // Error saving data
      // console.log({ error });

    }
  }

  static saveCredentialsLocally(email, password) {
    try {
      AsyncStorage.setItem('credentials', JSON.stringify({ email, password }));
    } catch (error) {
      // Error saving data
      // console.log({ error });

    }
  }

  static async retrieveUser() {
    return JSON.parse(await AsyncStorage.getItem('user'));
  }

  static async retrieveCredentials() {
    return JSON.parse(await AsyncStorage.getItem('credentials'));
  }

  static async retrieveToken() {

    let state = await NetInfo.getConnectionInfo();
    // console.log("Connection type", state.type);

    if(state.type === 'none'){
      //acá iría lo que cambie de screen o muestre el modal
      Alert.alert("No tienes internet");
    }

    let token = JSON.parse(await AsyncStorage.getItem('token')).token;

    return token;
    /* let response = await fetch(`${Config.apiUrl}/api/CheckToken`, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    let response = await fetch(`${Config.apiUrl}/api/Combo`, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }); */
    
    /* if (response.status === 200) {
      return token;
    } else {
      let credentials = JSON.parse(await AsyncStorage.getItem('credentials'));
      let user = await (await this.logIn(credentials.email, credentials.password)).json();

      // console.log(user);
      // Token se guarda en user.token
      if (user.applicationUser.token) {
        this.saveCredentialsLocally(email, password);
        this.saveTokenLocally(user.applicationUser.token);
        this.saveUserLocally(user);
        return user.applicationUser.token;
      }
      else {
        // User changed password
        await AsyncStorage.removeItem('credentials');
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        this.props.navigation.navigate("SignIn");
      }
    } */
  }

  static async retrieveRefreshToken() {
    let token = JSON.parse(await AsyncStorage.getItem('token')).refreshToken;

    return token;
  }

  static retrieveUserPromise() {
    return AsyncStorage.getItem('user');
  }

  /**
   * Erases user from local storage. after this, use callback
   * component takes care of navigation to homescreen through callback
   */
  static logOut(callBack) {
    AsyncStorage.removeItem('credentials');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem("user", callBack);
  }


}