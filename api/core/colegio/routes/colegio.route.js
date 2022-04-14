import {verifyApiToken, verifyRoleToken} from '../../midleware/autorization.js';

export  class ColegioRoute{
    constructor(express,controllers){
        this._route = express.Router();
        this._ctrl = controllers;
        this.registerRoutes();
    }
    registerRoutes(){
        this._route.get('/', verifyApiToken,verifyRoleToken,this.totalEstudiantesSuper.bind(this));
    }
    totalEstudiantesSuper(req, res){
        if (req.query.option != undefined){
            if (req.query.option == 'media'){
                let result = this._ctrl.estudiantesMedia(req.query);
                res.status(200).json(result);
            }
            else if (req.query.option == 'moda'){
                let result = this._ctrl.estudiantesModa(req.query);
                res.status(200).json(result);
            }
            else if (req.query.option == 'mediana'){
                let result = this._ctrl.estudiantesMediana(req.query);
                res.status(200).json(result);
            }
            else if (req.query.option == 'MPP'){
                let result = this._ctrl.mejorPromParametro(req.query);
                res.status(200).json(result);
            }
            else if (req.query.option == 'MPM'){
                let result = this._ctrl.promPorMateria(req.query);
                res.status(200).json(result);
            }
        }

        else{
            if (req.query.nivel == undefined && req.query.genero == undefined){
                let result= this._ctrl.tomarEstudiantes();
                res.status(200).json(result);
            }
            else if (req.query.nivel != undefined && req.query.genero == undefined){
                let result = this._ctrl.estudiatesPorNivel(req.query);
                res.status(200).json(result);
            }
            else if (req.query.nivel == undefined && req.query.genero != undefined){
                let result = this._ctrl.estudiantesPorGenero(req.query);
                res.status(200).json(result);
            }
            else if(req.query.nivel != undefined && req.query.genero != undefined){
                let result = this._ctrl.estudiantesPorGeneroYPorNivel(req.query);
                res.status(200).json(result);
            }
        }
    }
}