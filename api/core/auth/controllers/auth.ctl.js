export class AuthenticationController{
    constructor(model, modelAuthe, utilsBrypt, utilJsonWebToken){
        this._modelAuthe = modelAuthe;
        this._utilJsonWebToken = utilJsonWebToken;
        this._utilsBrypt = utilsBrypt;
        this._model = model;
    }

    async authUser(user){
        if(user.username){
            let data = await this._model.getUserByUsername(user.username);
            if(data){
                if(this._utilsBrypt.comparePassword(user.password,data.password)){
                    let token= this._utilJsonWebToken.generateToken(user);
                    let result = new this._modelAuthe(true, data.id, data.username, token, data.role||'user', 'Login success')
                    return result;
                }
            }
            return null;
        }else if(user.email){
            let data = await this._model.gerUserByEmail(user.email);
            if(data){
                if(this._utilsBrypt.comparePassword(user.password,data.password)){
                    let token= this._utilJsonWebToken.generateToken(user);
                    let result = new this._modelAuthe(true, data.id, data.username, token, data.role ||'user', 'Login success')
                    return result;
                }
            }
            return null;
        }else{
            return null;
        }
    }
}