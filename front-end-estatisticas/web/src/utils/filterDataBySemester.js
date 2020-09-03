export default function filterDataBySemester(response) {
    var semesters = []
    var filteredData = []

    response.data.forEach((turma) => {
        let index = semesters.indexOf(turma.periodo)
        let total = turma.aprovados + turma.reprovados_por_nota + turma.reprovados_por_frequencia

        if (index >= 0) {
            filteredData[index].aprovados += turma.aprovados
            filteredData[index].reprovados_por_nota += turma.reprovados_por_nota
            filteredData[index].reprovados_por_frequencia += turma.reprovados_por_frequencia
            filteredData[index].alunos += total
            filteredData[index].alunosxmedia += total * turma.media
            filteredData[index].alunos_di += turma.alunos_di
            filteredData[index].alunosxmedia_di += turma.alunos_di * turma.media_di
        } else {
            semesters.push(turma.periodo)

            if(total > 0) {
                let newSemester = {
                    periodo: turma.periodo,
                    aprovados: turma.aprovados,
                    reprovados_por_nota: turma.reprovados_por_nota,
                    reprovados_por_frequencia: turma.reprovados_por_frequencia,
                    alunosxmedia: total * turma.media,
                    media: 0,
                    alunos: total,
                    alunos_di: turma.alunos_di,
                    alunosxmedia_di: turma.alunos_di * turma.media_di
                }

                filteredData.push(newSemester)
            }    
        }
    })

    filteredData.forEach((data) => {
        data.media_di = data.alunosxmedia_di / data.alunos_di
        data.media = data.alunosxmedia / data.alunos
        data.porcentagem_aprovados = data.aprovados / data.alunos
        data.porcentagem_reprovados_por_nota = data.reprovados_por_nota / data.alunos
        data.porcentagem_reprovados_por_frequencia = data.reprovados_por_frequencia / data.alunos
        console.log(data.alunos)
    })

    return filteredData
}