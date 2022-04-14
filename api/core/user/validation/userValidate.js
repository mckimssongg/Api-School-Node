import {response} from '../../../response/response.js';
import expressValidator from 'express-validator';
import {HttpStatusCode} from '../../../utils/httpStatusCode.js';

const check = expressValidator.check;
const validationResult = expressValidator.validationResult;

export const validateNewUser = [
    check('username')
    .exists()
    .isLength({min:3})
    .withMessage('Username not is valid'),
    check('password')
    .exists()
    .isLength({min:8})
    .withMessage('Password not is valid'),
    check('email')
    .exists()
    .isEmail()
    .withMessage('Email not is valid'),
    check('role')
    .exists()
    .custom((value,{req})=>{
        if(value !== 'admin' && value !== 'basic'){
            throw new Error('Role must be admin or basic');
        }
        return true;
    }),
    (req,res,next)=>{
        try{
            validationResult(req).throw();
            next();
        }catch(error){
            response.error(req,res,error,HttpStatusCode.BAD_REQUEST);s
        }
    }
]




// export const validateNewUsera = (req, res, next) => {
//     try{
//         const {username, email, password} = req.body;
//         if(!username || !email || !password){
//             return response.error(req, res,'Please fill all the fields', 400);
//         }
//         if(!username.match(/^[a-zA-Z0-9]+$/) && username.length < 3){
//             return response.error(req, res,'Username should be alphanumeric', 400);
//         }
//         if(!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)){
//             return response.error(req, res,'Email should be valid', 400);
//         }
//         if(!password.match(/^[a-zA-Z0-9]+$/) && password.length < 8){
//             return response.error(req, res,'Password should be alphanumeric', 400);
//         }
//         next();
//     }catch(e){
//         console.log(e);
//         return response.error(req, res, e.message, 500);
//     }
// };
