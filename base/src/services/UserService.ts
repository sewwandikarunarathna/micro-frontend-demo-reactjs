import { CoreService } from "./CoreService";

export default class UserService extends CoreService {
    // constructor(){
    //     super();
    // }

    public async getUsers() {
        return this.axios.get("https://jsonplaceholder.typicode.com/users");
    }
}