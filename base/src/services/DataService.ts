export class DataService {
  //set access token
  setAccessToken(access_token: string) {
    return window.localStorage.setItem("token", access_token);
  }

  //get access token
  get token() {
    return window.localStorage.getItem("token");
  }

  //remove access token
  removeAccessToken() {
    return window.localStorage.removeItem("token");
  }

  //set usertype
  setUserType(userType: string) {
    return window.localStorage.setItem("userType", userType);
  }

  //get usertype
  get userType() {
    return window.localStorage.getItem("userType");
  }

  //remove access token
  removeUserType() {
    return window.localStorage.removeItem("userType");
  }

  //set logged in boolean value
  setLoggedIn(isLoggedIn: boolean) {
    return window.localStorage.setItem("loggedIn", isLoggedIn.toString());
  }

  //get logged in boolean value
  get isLoggedIn() {
    return window.localStorage.getItem("loggedIn");
  }
  //remove access token
  removeLoggedIn() {
    return window.localStorage.removeItem("loggedIn");
  }
}

export const dataService = new DataService();
