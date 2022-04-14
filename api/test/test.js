import {assert, expect, should} from 'chai'
import {describe, it} from 'mocha'
import {functMethModel} from '../core/colegio/models/colegio.model.js';

describe('Test de los get de la data colegio', ()=>{
    const functGetDate = new functMethModel()
    describe('Test de la funct totalEstudiantes', () =>{
        let total = functGetDate.totalEstudiantes()
        it('Debe retornar un numero', ()=>{
            expect(total).to.equal(550)
        }
        )
        it('Debe retornar 550', ()=>{
            expect(total).to.be.a('number')
        }
        )
    })
    describe('Test de la funct estudiantesPorNivel', () =>{
        let total = functGetDate.estudiantesPorNivel('primaria')
        it('Debe retornar un numero', ()=>{
            expect(total).to.be.a('number')
        }
        )
    })
    describe('Test de la funct totalEstudiantesPorGenero', () =>{
        let total = functGetDate.totalEstudiantesPorGenero('male')
        it('Debe retornar un numero', ()=>{
            expect(total).to.be.a('number')
        }
        )
    })
    // describe('Test de la funct totalPrimariaPorGenero',)
})