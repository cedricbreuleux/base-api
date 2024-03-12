const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
import { UserObject } from "../Users/UserCrud";

export async function checkPassword(user:UserObject, password: string) {

    const match = await bcrypt.compare(password, user.password);
    if(match) {
        return {
            status:true,
            message: "MDP ok."
        }
    }
    else {
        return {
            status:false,
            message: "MDP incorrect."
        }
    }

}

export async function CreateHashedPassword(password: string) {
        password = await bcrypt.hash(password, 10);

        return password;
}