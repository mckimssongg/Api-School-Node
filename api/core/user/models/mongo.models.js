import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
});

const userModel = mongoose.model('User', UserSchema);

export class userMongoModel{
    constructor(){
        this._model = userModel;
    }
    encryptPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    async save(data){
        data.password = this.encryptPassword(data.password);
        let user = this._model(data);
        let result = await user.save();
        return result;
    }
    async all(){
        let result = await this._model.find();
        return result;
    }
    async findById(id){
        let result = await this._model.findById(id);
        return result;
    }
}