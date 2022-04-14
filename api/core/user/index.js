import express from "express";
import {User} from "./models/user.js";
import {UserJsonFileModel} from "./models/user.models.js";
import {UserController} from "./controllers/user.ctl.js";
import {UserRoutes} from "./routes/user.routes.js";
import { userMongoModel } from "./models/mongo.models.js";
import {validateNewUser} from "./validation/userValidate.js";
import {response} from "../../response/response.js";


export const UserModule=()=>{
    // const model = new UserJsonFileModel(User);
    const model = new userMongoModel();
    const ctrl = new UserController(model);
    const route = new UserRoutes(express,ctrl,response,validateNewUser).router;
    return route;
}