import React, { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';
import './style.css';

import departmentByCode from '../../utils/departmentByCode'

import axios from 'axios'

const CardEstatistica = ({ selectSubject }) => {
    const [semesters, setSemesters] = useState([])

    useEffect(() => {
       const loadData = async () => {
            await axios.get('https://estatisticas.api.pet.inf.ufes.br/viewSortedGrid')
                .then(response => {
                    let periodos = response.data.ecomp.map((periodo)=>{
                        return(periodo)
                    })
                    
                    let vetorVazio = []

                    periodos.forEach(periodo => {
                        periodo.disciplinas.forEach(materia =>{
                            vetorVazio.push(materia)
                        })
                    })
                    vetorVazio.sort((a, b) => {
                        const codigoA = a.codigo.toUpperCase();
                        const codigoB = b.codigo.toUpperCase();

                        let comparison = 0;
                        if (codigoA > codigoB) {
                            comparison = 1;
                        } else if (codigoA < codigoB) {
                            comparison = -1;
                        }
                        return comparison;
                    })

                    var departamentos = []
                    var filteredData = []

                    vetorVazio.forEach((turma) => {
                        var departmentCode = turma.codigo.substring(0, 3)

                        let index = departamentos.indexOf(departmentCode)

                        if (index >= 0) {
                            filteredData[index].disciplina.push(turma)
                            
                        } else {
                            departamentos.push(departmentCode)

                            let newDepartament = {
                                departamentName: turma.codigo,
                                disciplina: [turma],
                                
                            }

                                filteredData.push(newDepartament)
    
                        }
                    })

                    setSemesters(filteredData)
                })
       }

       loadData()
    }, [])
    console.log(semesters);
    const handleSubjectClick = (e) => {
        selectSubject(e.target.text, e.target.id)
    }

    return (
        <div>
            {semesters.map((semester, index) => {
                return (
                    <Card key={index}>
                        <div>
                            <Card.Header>
                                   {departmentByCode(semester.departamentName)}                             
                            </Card.Header>
                            <ul className="list-group">
                            {semester.disciplina.map((subject, index2) => {
                                return (
                                    <li key={index2} className="list-group-item py-1 border-0">
                                        <div>
                                            <a onClick={handleSubjectClick} href="#" id={subject.codigo}>{subject.nome}</a>
                                        </div> 
                                    </li>   
                                )
                            })}
                            </ul> 
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}

export default CardEstatistica
