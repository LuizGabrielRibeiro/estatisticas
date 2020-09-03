import React, { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';
import './style.css';

import axios from 'axios'

const CardEstatistica = ({ selectSubject }) => {
    const [semesters, setSemesters] = useState([[]])

    useEffect(() => {
       const loadData = async () => {
            await axios.get('https://estatisticas.api.pet.inf.ufes.br/viewSortedGrid')
                .then(response => {
                    setSemesters(response.data.ecomp.map((semester) => {
                        return (semester.disciplinas)
                    }))
                })
       }

       loadData()
    }, [])

    console.log(semesters)

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
                                   {index + 1 < 11 ? `${index+1}º Período`  : "Optativas"}                               
                            </Card.Header>
                            <ul className="list-group">
                            {semester.map((subject, index2) => {
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