import express from "express";
import {AuthJsonModel} from "./models/auth.models.js";
import {AuthenticationController} from "./controllers/auth.ctl.js";
import {routesAuthentication} from "./routes/auth.routes.js";
import {userMongoModel} from "./models/authDb.models.js";
import {Authentication} from "./models/Autenticación.js";
import {JWBmethods} from "../../utils/JsonWebToken.js";
import {encryptOption} from "../../utils/bcrypt.js";


export const AuthModule=()=>{;
    // const model = new AuthJsonModel();
    const model = new userMongoModel();
    const ctrl = new AuthenticationController(model,Authentication,encryptOption,JWBmethods);
    const route = new routesAuthentication(express,ctrl)._router;
    return route;
}
