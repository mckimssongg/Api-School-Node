import { HttpStatusCode } from "../../../utils/httpStatusCode.js";


export class UserRoutes{
    constructor(express,controller, response, validateNewUser){
        this.router = express.Router();
        this._ctl = controller;
        this._response = response;
        this._validateNewUser = validateNewUser;
        this.registerRoutes();
    }
    
    registerRoutes(){
        this.router.get('/', this.getAllUser.bind(this));
        // this.router.put('/:id', this.updateUser.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this._validateNewUser,this.newUser.bind(this));
    }
    async getAllUser(req,res){
        try {
            let result = await this._ctl.getAll();
            this._response.success(req,res,result,HttpStatusCode.OK);
        } catch (error) {
            this._response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(req,res){
        try {
            let result = await this._ctl.getById(req.params.id);
            if (result){
                this._response.success(req,res,result,HttpStatusCode.OK);
            }
            else{
                let message = 'Not Found'
                this._response.error(req,res,message,HttpStatusCode.NOT_FOUND)
            }
        } catch (error) {
            this._response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async newUser(req,res){
        try {
            let result = await this._ctl.create(req.body);
            if(result){
                let message = `User ${result.username} has been created`;
                this._response.success(req,res,message,HttpStatusCode.OK);
            }
        } catch (error) {
            this._response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(req,res){
        console.log(req.params.id);
        console.log(req.body);
        try {
            let result = await this._ctl.update(req.params.id,req.body);
            this._response.success(req,res,result,HttpStatusCode.OK);  
        } catch (error) {
            this._response.error(req,res,error,HttpStatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}