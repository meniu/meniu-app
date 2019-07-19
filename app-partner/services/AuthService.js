export default class AuthService {

    static logIn(name, identification, password) {
      let objBody = {
        branchOffice:{
            name
        },
        partner:{
            identification
        },
        password
      }
      return fetch(`${Config.apiUrl}/api/Account/Login/BranchOffice`, {
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
  
    static saveTokenLocally(token) {
      try {
        AsyncStorage.setItem('token', token);
      } catch (error) {
        // Error saving data
        console.log({ error });
  
      }
    }
  
    static saveCredentialsLocally(email, password) {
      try {
        AsyncStorage.setItem('credentials', JSON.stringify({ email, password }));
      } catch (error) {
        // Error saving data
        console.log({ error });
  
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
      console.log("Connection type", state.type);
  
      if(state.type === 'none'){
        //acá iría lo que cambie de screen o muestre el modal
        Alert.alert("No tienes internet");
      }
  
      let token = await AsyncStorage.getItem('token');
  
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