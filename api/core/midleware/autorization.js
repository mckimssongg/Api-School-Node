import {JWBmethods} from '../../utils/JsonWebToken.js'
import {response} from "../../response/response.js";
import {HttpStatusCode} from "../../utils/httpStatusCode.js";


export  const verifyApiToken = async (req,res,next)=>{
    /** 
     * Verificacion del token antes
     * de proceder a tomar la peticion de la ruta
     */
    let token = req.headers['authorization'];
    if(token){
        let result= await JWBmethods.verifyToken(token);
        if(result){
            req.user = result;
            next(); 
            //Si todo es correcto seguimos con la peticion de la ruta
        }else{
            return response.error(
                req,
                res,
                'El token no existe',
                HttpStatusCode.UNAUTHORIZED);
        }
        
    }else{
        return response.error(
            req,
            res,
            'Es necesario un token para acceder',
            HttpStatusCode.UNAUTHORIZED);
    }
}


export const verifyRoleToken = async (req, res, next) =>{
    /**
     * Verificamos si el usuario tiene el rol que necesitamos
     * para poder acceder a los datos que queremos
     */
    let token = await req.headers['authorization'];
    if (token){
        if(req.query.option){
            let decode = await JWBmethods.decodeToken(token);
            let role = decode.payload.user.role
            if(role == 'admin'){
                next();
            }
            else{
                let message = "Lo siento brou, no sos admin :("
                return response.error(
                    req,
                    res,
                    {
                        "message" : message
                    },
                    HttpStatusCode.NOT_ACCEPTABLE
                )
            }
        }else{
            next();
        }
    }
    else{
        return response.error(
            req,
            res,
            'El token no existe parce :,v ',
            HttpStatusCode.NOT_FOUND
        )
    }
}