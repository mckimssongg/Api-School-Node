import {response} from '../../../response/response.js'
import { HttpStatusCode } from "../../../utils/httpStatusCode.js";
import { Authentication } from '../models/Autenticación.js';


export  class routesAuthentication{
    constructor(express,controller){
        this._router = express.Router()
        this._ctl = controller
        this.registerRoutes();
    }
    registerRoutes(){
        this._router.post('/',this.login.bind(this));
    }

    async login(req,res){
        let {username,email,password} = req.body;
        if(username || email && password){
            try {
                let user = await this._ctl.authUser(req.body);
                if(user){
                    return response.success(req,res,user,HttpStatusCode.OK);
                }else{
                    let result= new Authentication()
                    return response.error(req,res,result,HttpStatusCode.UNAUTHORIZED);
                }
            } catch (error) {
                let message = error.message;
                return response.error(req,res,message,HttpStatusCode.BAD_REQUEST);
            }
        }else{
            let message = 'Brou falta la contraseña o el usuario';
            return response.error(req,res,message,HttpStatusCode.BAD_REQUEST);
        }
    }
}