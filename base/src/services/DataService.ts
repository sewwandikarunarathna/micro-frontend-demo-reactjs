import { jwtDecode } from "jwt-decode";
import jwtEncode from "jwt-encode";
import secureLocalStorage from "react-secure-storage";

const hashKey = import.meta.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY;
const prefix = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
export class DataService {
  //set access token
  setAccessToken(access_token: string) {
    console.log('prefixxxx',prefix);
    
    const token = secureLocalStorage.setItem(`${prefix}_token`, 
      access_token !== ""
      ? access_token
      : "eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6IlsncmVhZCcsICdlZGl0J10iLCJ1c2VyVHlwZSI6IlVzZXIiLCJ1c2VyTmFtZSI6IlNld3dhbmRpIn0.EH6fzcrTV7N7U9R_jF8oQ9bDcBgjx54Kaz-Hcp5Sau0" 
    );
    // const token = window.localStorage.setItem(
      //   "token",
    //   access_token !== ""
    //     ? access_token
    //     : "eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6IlsncmVhZCcsICdlZGl0J10iLCJ1c2VyVHlwZSI6IlVzZXIiLCJ1c2VyTmFtZSI6IlNld3dhbmRpIn0.EH6fzcrTV7N7U9R_jF8oQ9bDcBgjx54Kaz-Hcp5Sau0"
    // );
    return token;
  }
  
  //get access token
  get token() {
    const tokenInStorage = secureLocalStorage.getItem(`${prefix}_token`);
    // window.localStorage.getItem("token");
    return tokenInStorage;
  }

  //remove access token
  removeAccessToken() {
    return secureLocalStorage.removeItem(`${prefix}_token`);
    // return window.localStorage.removeItem("token");
  }

  //enocde and decode token
  async decodeToken(token: string): Promise<any> {   
    const tokenPayload = await jwtDecode(token);
    return tokenPayload;
  }

  async encodeToken(tokenPayload: string): Promise<any> {
    const jwtSecret = process.env.REACT_APP_JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    // Generate the token
    const token = await jwtEncode(tokenPayload, jwtSecret);
    return token;
  }

  //set usertype
  setUserType(userType: string) {
    return window.localStorage.setItem("userType", userType);
  }

  //get usertype
  // async getUserType() {
  //   await dataService.decodeToken(this.token)
  //   return window.localStorage.getItem("userType");
  // }

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
