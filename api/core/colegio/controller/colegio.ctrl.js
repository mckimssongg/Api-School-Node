
export class ColegioContreller{
    constructor(model){
        this._model=model;
    }

    tomarEstudiantes(q){
        return this._model.totalEstudiantes();
    }

    estudiatesPorNivel(q){
        let {nivel} = q
        return this._model.estudiantesPorNivel(nivel);
    }
    
    estudiantesPorGenero(q){
        let {genero} = q
        return this._model.totalEstudiantesPorGenero(genero);
    }

    estudiantesPorGeneroYPorNivel(q){
        let {nivel, genero} = q;
        return this._model.totalPrimariaPorGenero(nivel, genero);
    }

    estudiantesMedia(q){
        let {nivel, grado, curso} = q;
        console.log(nivel, grado, curso)
        return this._model.mediaNotas(nivel, grado, curso);

    }
    estudiantesModa(q){
        let {nivel, grado, curso} = q;
        return this._model.modaNotas(nivel, grado, curso);

    }
    estudiantesMediana(q){
        let {nivel, grado, curso} = q;
        return this._model.medianaNotas(nivel, grado, curso);

    }
    promPorMateria(q){
        let {materia} = q;
        return this._model.mejorPromAsignatura(materia);

    }
    mejorPromParametro(q){
        let {nivel, grado, curso} = q;
        return this._model.mejorPromParametro(nivel, grado, curso);
    }
    estudainteRAmdom(q){
        let {grado} = q;
        return this._model.mostrarEstudiante(grado);
    }

}   