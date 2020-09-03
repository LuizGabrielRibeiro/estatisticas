import React, { useState, useEffect } from 'react'

import Chart from 'react-google-charts'
import { Slider, Typography } from '@material-ui/core'
import { IoIosCloseCircleOutline } from 'react-icons/io'

import filterDataBySemester from '../../utils/filterDataBySemester'
import departmentByCode from '../../utils/departmentByCode'
import chartOptions from '../../utils/chartOptions'

import axios from 'axios'

import './styles.css'

const SubjectChart = ({selectedSubject, selectedSubjectCode}) => {
    const [sliderIndexes, setSliderIndexes] = useState([0, 1])
    const [chartData, setChartData] = useState([[]])
    const [allData, setAllData] = useState([])
    const [showChart, setShowChart] = useState(false)
    const [department, setDepartment] = useState("")

    useEffect(() => {
        const loadData = async () => {
            await axios.get(`https://estatisticas.api.pet.inf.ufes.br/items/${selectedSubjectCode}`)
                .then(response => {
                    let filteredData = filterDataBySemester(response)
                    
                    let dataToChart = filteredData.map(semester => {
                        if(semester.periodo && 
                            semester.porcentagem_aprovados != null && 
                            semester.porcentagem_reprovados_por_nota != null && 
                            semester.porcentagem_reprovados_por_frequencia != null
                        ) {
                            return [
                                semester.periodo,
                                Number((semester.porcentagem_aprovados * 100).toFixed(2)),
                                Number((semester.porcentagem_reprovados_por_nota * 100).toFixed(2)),
                                Number((semester.porcentagem_reprovados_por_frequencia * 100).toFixed(2)),
                                Number(semester.media),
                                Number(semester.media_di)
                            ]
                        }
                        return null
                    })

                    setAllData(dataToChart)
                    setSliderIndexes([0, filteredData.length - 1])

                    dataToChart.unshift(['Período', 'Aprovados', 'Reprovado por nota', 'Reprovado por falta', 'Média CT', 'Média DI'])
                    
                    setChartData(dataToChart)

                    if(dataToChart.length > 1) {
                        setShowChart(true)
                        setDepartment(departmentByCode(selectedSubjectCode))
                    } else {
                        setShowChart(false)

                        if(selectedSubjectCode) {
                            alert("Não temos informações dessa disciplina")
                        }
                    }
                    
                })
        }

        loadData()
        
    }, [selectedSubjectCode])

    const handleSliderChange = (e, newValue) => {
        setSliderIndexes(newValue)

        var slicedData = allData.slice(newValue[0] + 1, newValue[1] + 2)
        slicedData.unshift(['Período', 'Aprovados', 'Reprovado por nota', 'Reprovado por falta', 'Média CT', 'Média DI'])

        setChartData(slicedData)
    }

    const valuetext = (value) => {
        if(allData[value]) {
            return `${allData[value+1][0]}`
        }
        return null
    }

    return (
        <div className="sticky-top py-5">
        {showChart
            ? (
                <div className="chart-container py-5">
                    <div className="d-flex title-subtitle">
                        <div className="pb-3">
                            <h2 className="chart-title">{`${selectedSubject} - ${selectedSubjectCode}`}</h2>
                            <p style={{color: 'gray'}}>{department}</p>
                        </div>
                        <div className="ml-auto x-icon">
                            <IoIosCloseCircleOutline color={"gray"} size={40} onClick={() => setShowChart(false)}/>
                        </div>
                    </div>      
                    <div className="d-flex chart">
                        <Chart 
                            width={'99%'}
                            height={450}
                            chartType="ColumnChart"
                            loader={<div>Carregando</div>}
                            data={chartData}
                            options={
                                chartOptions(chartData.length)
                            }
                        />
                    </div>
                    <div className="d-flex justify-content-center py-1">
                        <div style={{width: '60%'}}>
                            <Typography id="range-slider" gutterBottom>
                            </Typography>
                            <Slider
                                value={sliderIndexes}
                                min={0}
                                max={allData.length - 2}
                                step={1}
                                valueLabelDisplay="auto"
                                onChange={handleSliderChange}
                                aria-labelledby="range-slider"
                                getAriaValueText={valuetext}
                            />
                        </div>
                    </div>
                </div>
            )
            : (
                <></>
            ) 
        }
        
        </div>  
    )
}

export default SubjectChart
