import mongoose from "mongoose";

const userModel = mongoose.model('User');

export class userMongoModel{
    constructor(){
        this._model = userModel;
    }
    async all(){
        let result = await this._model.find();
        return result;
    }

    async getUserByUsername(username){
        let data = await this.all();
        let user = await data.find(user => user.username == username);
        return user;
    }

    async gerUserByEmail(email){
        let data = await this.all();
        let user = await data.find(user => user.email == email);
        return user;
    }
}