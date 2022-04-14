
import bcrypt from 'bcrypt';
// import { encryptOption } from '../../../utils/bcrypt.js';

export class User{
    constructor(user){
        this._id = 0;
        this.username = user.username;
        this.email = user.email;
        this.password = this.encryptPassword(user.password);
        this._role= user.role;
    }
    
    encryptPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
}