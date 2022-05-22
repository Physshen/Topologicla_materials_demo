
var esite = eval(document.getElementById("esite").value)
var delta2 = eval(document.getElementById("delta2").value)
var n2 = Math.round(document.getElementById("n2").value)

var xArr = [];
var xArr1 = [];
for (var i = -50; i < 51; i++) {
    xArr.push(i * 2 * Math.PI / 100)
    xArr1.push(xArr[i+50].toFixed(2))
}

var yArr1 = dispersion2(esite, delta2, n2);
var Data = []

for (i = 0; i < 2 * n2; i++) {
    Data.push({
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0)",
        data: sliceMatrix(yArr1, 0, 101, i, i + 1)

    })
}

new Chart("myChart3", {
    type: "line",
    data: {
        labels: xArr1,
        datasets: Data
    },
    options: {
        legend: { display: false },
        scales: {
            xAxes: [{scaleLabel: {
                display: true,
                labelString: 'k_x'
              },ticks: { min: -3.14, max: 3.14 } }],
            yAxes: [{scaleLabel: {
                display: true,
                labelString: 'E'
              },ticks: { min: - 6, max: 6 } }]
        },
        animation: {
            duration: 0
        }
    }
});

function change2(input, div, n) {

    var value = parseFloat(document.getElementById(input).value);
    value = value.toFixed(n)
    document.getElementById(div).innerHTML = value;

    var esite = eval(document.getElementById("esite").value)
    var delta2 = eval(document.getElementById("delta2").value)
    var n2 = Math.round(document.getElementById("n2").value)

    var xArr = [];
    var xArr1 = [];
    for (var i = -50; i < 51; i++) {
        xArr.push(i * 2 * Math.PI / 100)
        xArr1.push(xArr[i+50].toFixed(2))
    }

    var yArr1 = dispersion2(esite, delta2, n2);
    var Data = []

    for (i = 0; i < 2 * n2; i++) {
        Data.push({
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0)",
            data: sliceMatrix(yArr1, 0, 101, i, i + 1)

        })
    }

    var graphContainer3 = document.getElementById('graphContainer3');
    graphContainer3.innerHTML = '&nbsp;';
    graphContainer3.innerHTML = '<canvas id="myChart3" style="width:130%;max-width:1200px"><canvas>';

    var myChart = document.getElementById("myChart3");
    var ctx = myChart.getContext('2d')

    new Chart(ctx, {
        type: "line",
        data: {
            labels: xArr1,
            datasets: Data
        },
        options: {
            legend: { display: false },
            scales: {
                xAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'k_x'
                  },ticks: { min: -3.14, max: 3.14 } }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'E'
                  },ticks: { min: - 6, max: 6 } }]
            },
            animation: {
                duration: 0
            }
        }
    });
}