
import {datosColegio} from "../../../db/data.js";

const dataColegio = datosColegio[0].colegio
const dataColegio1 = datosColegio[0].colegio
const datosColegio1 = datosColegio[0].colegio
let data = dataColegio1

export class functMethModel{
    constructor(entity){
        this._entity=entity;
    }


    totalEstudiantes(){
        let total = 0
        Object.entries(dataColegio).forEach(([key, nivel])=>{
            nivel.forEach((grado)=>{
                Object.entries(grado).forEach(([key, curso])=>{
                    curso.forEach(seccion =>{
                        total += seccion.estudiantes.length;
                    })
                })
            })
        })
        return total
    }


    estudiantesPorNivel(nivel){
        let total = 0
        dataColegio[nivel].forEach((grado)=>{
            Object.entries(grado).forEach(([key, curso])=>{
                curso.forEach(seccion =>{
                    total += seccion.estudiantes.length;
                })
            })
        })
    return total
    }


    totalEstudiantesPorGenero(genero){
        let total = 0
        Object.entries(dataColegio).forEach(([key, nivel])=>{
            nivel.forEach((grado)=>{
                Object.entries(grado).forEach(([key, curso])=>{
                    curso.forEach(seccion =>{
                        total += seccion.estudiantes.filter(estudiante => estudiante.genero == genero).length
                    })
                })
            })
        })
        return total
    }
    
    
    totalPrimariaPorGenero(nivel,genero){
        let total = 0
        dataColegio[nivel].forEach((grado)=>{
            Object.entries(grado).forEach(([key, curso])=>{
                curso.forEach(seccion =>{
                    total += seccion.estudiantes.filter(estudiante => estudiante.genero == genero).length
                })
            })
        })
    return total
    }
    notas(nivel, grado, curso){
        // console.log(nivel, grado, curso)
        let todasLasNotas = []
        if (nivel == undefined & grado == undefined & curso == undefined) {
            Object.entries(datosColegio1).forEach(([key, nivel])=>{
                nivel.forEach((grado)=>{
                    Object.entries(grado).forEach(([key, curso])=>{
                        curso.forEach(seccion =>{
                            seccion.estudiantes.forEach(estudiante =>{
                                estudiante.asignaturas.forEach(asignatura =>{
                                    Object.entries(asignatura).forEach(([key, materiaNotas])=>{
                                        Object.entries(materiaNotas).forEach(([key, nota]) =>{
                                            todasLasNotas.push(nota)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        else if(grado == undefined & curso == undefined){
            data[nivel].forEach((grado)=>{
                Object.entries(grado).forEach(([key, curso])=>{
                    curso.forEach(seccion =>{
                        seccion.estudiantes.forEach(estudiante =>{
                            estudiante.asignaturas.forEach(asignatura =>{
                                Object.entries(asignatura).forEach(([key, materiaNotas])=>{
                                    Object.entries(materiaNotas).forEach(([key, nota]) =>{
                                        todasLasNotas.push(nota)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
        else if(curso == undefined){
            data[nivel][0][grado].forEach((curso)=>{
                    curso.estudiantes.forEach(estudiante =>{
                            estudiante.asignaturas.forEach(asignatura =>{
                                Object.entries(asignatura).forEach(([key, materiaNotas])=>{
                                    Object.entries(materiaNotas).forEach(([key, nota]) =>{
                                        todasLasNotas.push(nota)
                                    })
                                })
                            })
                        })
                    })
        }
        else {
            let  datosNivel = datosColegio1[nivel][0];
            let datosGrado = datosNivel[grado];
            datosGrado.forEach((objetoCurso) =>{
                if(objetoCurso.curso == curso){
                    objetoCurso.estudiantes.forEach(estudiante =>{
                        estudiante.asignaturas.forEach(asignatura =>{
                            Object.entries(asignatura).forEach(([key, materiaNotas])=>{
                                Object.entries(materiaNotas).forEach(([key, nota]) =>{
                                    todasLasNotas.push(nota)
                                })
                            })
                        })
                    })
                }
            })
        }
        todasLasNotas.sort()
        return todasLasNotas
    }
    
    // console.log(notas('primaria', 'primero', 'A'))
    
    mediaNotas(nivel, grado, curso){
        let todasLasNotas = this.notas(nivel, grado, curso)
        let media = todasLasNotas.reduce((acc, nota) => {return acc +=nota}) / todasLasNotas.length
        return media
    }
    
    // console.log(mediaNotas())
    
    modaNotas(nivel, grado, curso){
        const mode = {};
        let max = 0, count = 0;
        this.notas(nivel, grado, curso).forEach((item) => {
    
          if(mode[item]) {
            mode[item]++;
          } else {
            mode[item] = 1;
          }
          
          if(count < mode[item]) {
            max = item;
            count = mode[item];
          }
        });
        return max;
    }

    medianaNotas(nivel, grado, curso){
        let mediana;
        let datoMitad;
        let notas1;
        if (nivel == undefined & grado == undefined & curso == undefined){
            notas1 = this.notas();
        }
        else if (grado == undefined & curso == undefined) {
            notas1 = this.notas(nivel);
        }
        else if (curso == undefined){
            if (grado != undefined) {
                if (grado == 'primero' || grado == 'segundo' || grado == 'tercero' || grado == 'cuarto' || grado == 'quinto' || grado == 'sexto' || grado == 'septimo' || grado == 'octavo' || grado == 'noveno' || grado == 'decimo' || grado == 'once') {
                    notas1 = this.notas(nivel, grado);
                }
                else {
                        return String(`El grado ${grado} no existe.`);
                    }
            }
        }
        else{
            if (curso == 'A' || curso == 'B') {
                if (curso == 'A') {
                    notas1 = this.notas(nivel, grado, 0);
                }
                else {
                    notas1 = this.notas(nivel, grado, 1);
                }
            }
            else {
                return String(`El curso ${curso} no existe.`);
            }
        }
        let notas2 = []
        notas2 = notas1.sort()
        if (notas2.length % 2 != 0) {
            datoMitad = (notas2.length - 1) / 2;
            mediana = notas2[datoMitad];
        }
        else {
            datoMitad = (notas2.length / 2) - 1;    
            mediana = (notas2[datoMitad] + notas2[datoMitad + 1]) / 2;
        }
        return mediana;
    }

    mejorPromAsignatura(asignaturaDeseada){
        let estudianteMejorProm = {
            nombre: '',
            grado: '',
            curso: '',
            promedio: 0
        };
    
        let sumaNotas = 0;
        let conteoNotas = 0;
    
        for (let nivel in datosColegio1) {
            let grados = datosColegio1[nivel][0];
            for (let grado in grados) {
                let cursos = grados[grado];
                for (let curso in cursos) {
                    let estudiantes = cursos[curso].estudiantes;
                    for (let estudiante in estudiantes) {
                        let asignaturas = estudiantes[estudiante].asignaturas;
                        for (let asignatura in asignaturas) {
                            let cortes = asignaturas[asignatura];
                            for (let corte in cortes) {
                                if (corte == asignaturaDeseada) {
                                    let notas = cortes[corte];
                                    for (let nota in notas) {
                                        sumaNotas += notas[nota];
                                        conteoNotas += 1;
                                    }
                                    let promedio = sumaNotas / conteoNotas;
                                    if (promedio > estudianteMejorProm.promedio) {
                                        estudianteMejorProm.nombre = estudiantes[estudiante].nombre;
                                        estudianteMejorProm.grado = grado;
                                        estudianteMejorProm.curso = cursos[curso].curso;
                                        estudianteMejorProm.promedio = promedio;
                                    }
                                    sumaNotas = 0;
                                    conteoNotas = 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        // console.log(`El estudiante con mejor promedio en ${asignaturaDeseada} es: ${estudianteMejorProm.nombre}, grado: ${estudianteMejorProm.grado}, curso: ${estudianteMejorProm.curso},  con un promedio de ${estudianteMejorProm.promedio}`);

        return {
            'nombre': estudianteMejorProm.nombre,
            'grado': estudianteMejorProm.grado,
            'curso': estudianteMejorProm.curso,
            'promedio': estudianteMejorProm.promedio
        }
    }
    
    
    mejorPromParametro(nivel, grado, curso) {
        //funcion para obtener el estudiante con mejor nota en promedio en el Colegio
        if (nivel == undefined & grado == undefined & curso == undefined){
            function mejorPromColegio(datosColegio1) {
                let estudianteMejorProm = {
                    nombre: '',
                    grado: '',
                    curso: '',
                    promedio: 0
                };
    
                let sumaNotas = 0;
                let conteoNotas = 0;
    
                for (let nivel in datosColegio1) {
                    let grados = datosColegio1[nivel][0];
                    for (let grado in grados) {
                        let cursos = grados[grado];
                        for (let curso in cursos) {
                            let estudiantes = cursos[curso].estudiantes;
                            for (let estudiante in estudiantes) {
                                let asignaturas = estudiantes[estudiante].asignaturas;
                                for (let asignatura in asignaturas) {
                                    let cortes = asignaturas[asignatura];
                                    for (let corte in cortes) {
                                        let notas = cortes[corte];
                                        for (let nota in notas) {
                                            sumaNotas += notas[nota];
                                            conteoNotas += 1;
                                        }
                                    }
                                }
                                let promedio = sumaNotas / conteoNotas;
                                if (promedio > estudianteMejorProm.promedio) {
                                    estudianteMejorProm.nombre = estudiantes[estudiante].nombre;                            
                                    estudianteMejorProm.grado = grado;
                                    estudianteMejorProm.curso = cursos[curso].curso;
                                    estudianteMejorProm.promedio = promedio;
                                }
                                sumaNotas = 0;
                                conteoNotas = 0;
                            }
                        }
                    }
                }
                // console.log(`El estudiante con mejor promedio en el colegio es ${estudianteMejorProm.nombre}, curso: ${estudianteMejorProm.grado} ${estudianteMejorProm.curso}, promedio: ${estudianteMejorProm.promedio}`);

                return ({
                    'nombre': estudianteMejorProm.nombre,
                    'grado': estudianteMejorProm.grado,
                    'curso': estudianteMejorProm.curso,
                    'promedio': estudianteMejorProm.promedio
                })
            }
            return mejorPromColegio(datosColegio1);
        }
        //funcion para obtener el estudiante con mejor nota en promedio en una seccion, ya sea primaria o secundaria
        else if (grado == undefined & curso == undefined){
            function mejorPromNivel(nivel) {
                let estudianteMejorProm = {
                    nombre: '',
                    grado: '',
                    curso: '',
                    promedio: 0
                };
                let sumaNotas = 0;
                let conteoNotas = 0;
                let nivelValue = '';
                if (nivel == 'primaria') {
                    nivelValue = 'primaria'
                } else if (nivel == 'secundaria') {
                    nivelValue = 'secundaria'
                }
                let grados = datosColegio1[nivel][0];
                for (let grado in grados) {
                    let cursos = grados[grado];
                    for (let curso in cursos) {
                        let estudiantes = cursos[curso].estudiantes;
                        for (let estudiante in estudiantes) {
                            let asignaturas = estudiantes[estudiante].asignaturas;
                            for (let asignatura in asignaturas) {
                                let cortes = asignaturas[asignatura];
                                for (let corte in cortes) {
                                    let notas = cortes[corte];
                                    for (let nota in notas) {
                                        sumaNotas += notas[nota];
                                        conteoNotas += 1;
                                    }
                                }
                            }
                            let promedio = sumaNotas / conteoNotas;
                            if (promedio > estudianteMejorProm.promedio) {
                                estudianteMejorProm.nombre = estudiantes[estudiante].nombre;                            
                                estudianteMejorProm.grado = grado;
                                estudianteMejorProm.curso = cursos[curso].curso;
                                estudianteMejorProm.promedio = promedio;
                            }
                            sumaNotas = 0;
                            conteoNotas = 0;
                        }
                    }
                }
                // console.log(`El estudiante con mejor promedio en ${nivelValue} es ${estudianteMejorProm.nombre}, curso: ${estudianteMejorProm.grado} ${estudianteMejorProm.curso}, promedio: ${estudianteMejorProm.promedio}`);
                return {
                    'nombre': estudianteMejorProm.nombre,
                    'grado': estudianteMejorProm.grado,
                    'curso': estudianteMejorProm.curso,
                    'promedio': estudianteMejorProm.promedio
                }
            }
            return mejorPromNivel(nivel);
        }
         //funcion para obtener el estudiante con mejor nota en promedio en el grado ingresado por parámetro ej 'cuarto'
        else if (curso == undefined){
            function mejorPromGrado(datosColegio1, nivel, grado) {
                let estudianteMejorProm = {
                    nombre: '',
                    grado: '',
                    curso: '',
                    promedio: 0
                };
                let sumaNotas = 0;
                let conteoNotas = 0;
                let grados = datosColegio1[nivel][0][grado];
                for (let curso in grados) {
                    let estudiantes = grados[curso].estudiantes;
                    for (let estudiante in estudiantes) {
                        let asignaturas = estudiantes[estudiante].asignaturas;
                        for (let asignatura in asignaturas) {
                            let cortes = asignaturas[asignatura];
                            for (let corte in cortes) {
                                let notas = cortes[corte];
                                for (let nota in notas) {
                                    sumaNotas += notas[nota];
                                    conteoNotas += 1;
                                }
                            }
                        }
                        let promedio = sumaNotas / conteoNotas
                        if (promedio > estudianteMejorProm.promedio) {
                            estudianteMejorProm.nombre = estudiantes[estudiante].nombre;
                            estudianteMejorProm.curso = grados[curso].curso;
                            estudianteMejorProm.promedio = promedio;
                        }
                        sumaNotas = 0;
                        conteoNotas = 0;
                    }
                }
                // console.log(`El estudiante con mejor promedio en el grado ${grado} es ${estudianteMejorProm.nombre}, curso: ${estudianteMejorProm.curso}, promedio: ${estudianteMejorProm.promedio}`);

                return {
                    'nombre': estudianteMejorProm.nombre,
                    'curso': estudianteMejorProm.curso,
                    'promedio': estudianteMejorProm.promedio
                }
            }
            return mejorPromGrado(datosColegio1, nivel, grado);
        } 
        //funcion para obtener el estudiante con mejor nota en promedio en el curso
        else {
            function mejorPromCurso (datosColegio1, nivel, grado, curso) {
                let estudianteMejorProm = {
                    nombre: '',
                    promedio: 0,
                };
                let sumaNotas = 0;
                let conteoNotas = 0;
                let cursoPos;
                if(curso == 'A'){
                 cursoPos = 0
                }
                else if (curso == 'B'){
                 cursoPos = 1
                }
                else {
                    console.log('el curso ingresado no es correcto')
                    return
                }
                let datosCurso = datosColegio1[nivel][0][grado][cursoPos];
                let estudiantes = datosCurso.estudiantes;
                for (let estudiante in estudiantes) {
                    let asignaturas = estudiantes[estudiante].asignaturas;
                    for (let asignatura in asignaturas) {
                        let cortes = asignaturas[asignatura];
                        for (let corte in cortes) {
                            let notas = cortes[corte];
                            for (let nota in notas) {
                                sumaNotas += notas[nota];
                                conteoNotas += 1;
                            }
                        }
                    }
                    let promedio = sumaNotas / conteoNotas
                    if (promedio > estudianteMejorProm.promedio) {
                        estudianteMejorProm.nombre = estudiantes[estudiante].nombre;
                        estudianteMejorProm.promedio = promedio;
                    }
                    sumaNotas = 0;
                    conteoNotas = 0;
                }
                // console.log(`El estudiante con mejor promedio en el curso ${grado} ${curso} es ${estudianteMejorProm.nombre} con un promedio de ${estudianteMejorProm.promedio}`);

                return {
                    'nombre': estudianteMejorProm.nombre,
                    'promedio': estudianteMejorProm.promedio
                }
            }
            return mejorPromCurso (datosColegio1, nivel, grado, curso);
        }
    }
    
    //Buscar un estudiante que pertenezca a un grado seleccionado por parametro.*/

    mostrarEstudiante(grado){
        let nivel;
        function getRandom(max){
            return Math.round(Math.random()*max);
        }
        if (grado == 'primero' || grado == 'segundo' || grado == 'tercero' || grado == 'cuarto' || grado == 'quinto') {
            nivel = 'primaria';
        }
        else{
             if (grado == 'sexto' || grado == 'septimo' || grado == 'octavo' || grado == 'noveno' || grado == 'decimo' || grado == 'once') {
                nivel = 'secundaria';
             }
            else {
                return String(`El grado ${grado} no existe.`);
            }    
        }
    
        let curso = getRandom(1);
        let posEstudiante = getRandom(datosColegio1[nivel][0][grado][curso].estudiantes.length-1);
        let estudiante = datosColegio1[nivel][0][grado][curso].estudiantes[posEstudiante];
    
        return estudiante;
    }
    
    // console.log(mediaNotas())
    // all(){
    //     return contactsData;
    // }
    
    // findByName(name,apellido){
    //     // return contactsData.filter(contact=>contact.name.toLocaleLowerCase() == name.toLocaleLowerCase() ).find(contact=>contact.lastname.toLocaleLowerCase()===apellido.toLocaleLowerCase());
    //     return contactsData.find(contact=>contact.name.toLocaleLowerCase()==name.toLocaleLowerCase());
    // }
       
    // findByAge(){

    // }
}