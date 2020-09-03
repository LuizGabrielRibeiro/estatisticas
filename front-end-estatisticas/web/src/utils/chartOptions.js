export default function chartOptions(dataLength) {
    var groupWidth = dataLength < 12 ? "30%" : "35%"
    var pointSize = dataLength < 10 ? 6 : 5
    var lineWidth = dataLength < 10 ? 3 : 2

    return {
        chartArea: {height: '70%', width: '80%'},
        isStacked: true,
        colors: ['#3366cc', '#dc3912', '#ff9900'],
        title: 'Aprovações e Reprovações',
        legend: 'top',
        backgroundColor: '#f5f5f5',
        bar: {groupWidth: groupWidth},
        vAxes: {
            0: {
                viewWindow: {
                    max: 100
                }
            },
            1: {
                viewWindow: {
                    max: 10
                }
            }
        },
        series: {
            0: {targetAxisIndex: 0},
            1: {targetAxisIndex: 0},
            2: {targetAxisIndex: 0},
            3: {
                targetAxisIndex: 1, 
                type: 'line', 
                color: '#00c4cb', 
                pointSize: pointSize, 
                lineWidth: lineWidth
            },
            4: {
                targetAxisIndex: 1, 
                type: 'line', 
                color: '#9100e4', 
                pointSize: pointSize, 
                lineWidth: lineWidth
            }
        },
    }
}