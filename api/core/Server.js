import express from "express";
import morgan from "morgan";
import cors from "cors";

import {fileURLToPath} from "url";
import {dirname,join} from "path";

import { root } from '../utils/constRoutes.js';
import {ColegioModule} from "./colegio/index.js"
import {UserModule} from "./user/index.js"
import {AuthModule} from "./auth/index.js"
import { mongodb } from "../dbConnection/mongoConect.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";


export class Server{
    constructor(config){
        this._api = express();
        this._hostname=config.api.hostname;
        this._port=config.api.port;
        this._name=config.api.name;
        this._dirname = dirname(fileURLToPath(import.meta.url));
        this._swaggerJsDocs = YAML.load(join(dirname(fileURLToPath(import.meta.url)),"../docs/docs.yaml"));
        this.setMiddlewares();
        this.setRoutes();
        //Test de conexion a mongo DB
        this._mongodb = mongodb.connect();
    }
    
    setMiddlewares(){
        this._api.use(morgan('dev'));
        this._api.use(cors());
        this._api.use(express.json());
        this._api.use(express.urlencoded({extended:true}));
    }

    setRoutes(){
        this._api.use(root.COLEGIO, ColegioModule());
        this._api.use(root.USER, UserModule());
        this._api.use(root.LOGIN, AuthModule());
        this._api.use('/api/v1/docs',swaggerUi.serve,swaggerUi.setup(this._swaggerJsDocs));
    }

    start(){
        try {
            this._api.set('trust proxy', this._hostname);
            this._api.listen(this._port,()=>{
                console.log(`${this._name} server is running on http://${this._hostname}:${this._port}`);
            })
        } catch (error) {
            console.log(error);
        }
    }
}