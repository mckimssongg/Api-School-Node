import express from "express";
import {functMethModel} from "./models/colegio.model.js";
import {ColegioContreller} from "./controller/colegio.ctrl.js";
import {ColegioRoute} from "./routes/colegio.route.js";


export const ColegioModule=()=>{;
    const model = new functMethModel();
    const ctrl = new ColegioContreller(model);
    const route = new ColegioRoute(express,ctrl)._route;
    return route;
}

