const sigma_x = [[0, 1], [1, 0]]
const sigma_y = [[0, math.complex(0, -1)], [math.complex(0, 1), 0]]
const sigma_z = [[1, 0], [0, -1]]

var A = document.getElementById("a").value
var B = document.getElementById("b").value
var N = Math.round(document.getElementById("n").value)

var xArr = [];
var xArr1 = [];
for (var i = -50; i < 51; i++) {
    xArr.push(i * 2 * Math.PI / 100)
    xArr1.push(xArr[i + 50].toFixed(2))
}

var yArr1 = dispersion(A, B, N);
var Data = []

for (i = 0; i < 2 * N; i++) {
    Data.push({
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0)",
        data: sliceMatrix(yArr1, 0, 101, i, i + 1)

    })
}

new Chart("myChart1", {
    type: "line",
    data: {
        labels: xArr1,
        datasets: Data
    },
    options: {
        legend: { display: false },
        scales: {
            xAxes: [{ scaleLabel: {
                display: true,
                labelString: 'k_x'
              },ticks: {min: - 3.14, max: 3.14 } }],
            yAxes: [{scaleLabel: {
                display: true,
                labelString: 'E'
              }, ticks: { min: - 6, max: 6 } }]
        },
        animation: {
            duration: 0
        }
    }
});

function change1(input, div, n) {

    var value = parseFloat(document.getElementById(input).value);
    value = value.toFixed(n)
    document.getElementById(div).innerHTML = value;

    var A = document.getElementById("a").value
    var B = document.getElementById("b").value
    var N = Math.round(document.getElementById("n").value)

    var xArr = [];
    var xArr1 = []
    for (var i = -50; i < 51; i++) {
        xArr.push(i * 2 * Math.PI / 100)
        xArr1.push(xArr[i + 50].toFixed(2))
    }

    var yArr1 = dispersion(A, B, N);
    var Data = []

    for (i = 0; i < 2 * N; i++) {
        Data.push({
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0)",
            data: sliceMatrix(yArr1, 0, 101, i, i + 1)

        })
    }

    var graphContainer = document.getElementById('graphContainer1');
    graphContainer.innerHTML = '&nbsp;';
    graphContainer.innerHTML = '<canvas id="myChart1" style="width:130%;max-width:1200px"><canvas>';

    var myChart = document.getElementById("myChart1");
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
                xAxes: [{ scaleLabel: {
                    display: true,
                    labelString: 'k_x'
                  }, ticks: {min: - 3.14, max: 3.14 } }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'E'
                  }, ticks: { min: - 6, max: 6 } }]
            },
            animation: {
                duration: 0
            }
        }
    });
}
