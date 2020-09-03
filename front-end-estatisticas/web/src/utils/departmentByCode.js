export default function departmentByCode(code) {
    var departmentCode = code.substring(0, 3)

    if(departmentCode === "INF") {
        return "Departamento de Informática"
    } else if (departmentCode === "MAT") {
        return "Departamento de Matemática"
    } else if (departmentCode === "ELE") {
        return "Departamento de Engenharia Elétrica"
    } else if (departmentCode === "FIS") {
        return "Departamento de Física"
    } else if (departmentCode === "MCA") {
        return "Departamento de Engenharia Mecânica"
    } else if (departmentCode === "QUI") {
        return "Departamento de Química"
    } else if (departmentCode === "STA") {
        return "Departamento de Estatística"
    } else if (departmentCode === "DEA") {
        return "Departamento de Engenharia Ambiental"
    } else if (departmentCode === "EPR") {
        return "Departamento de Engenharia de Produção"
    } else {
        return "Departamento"
    }
}