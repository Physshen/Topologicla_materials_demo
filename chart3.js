var barrier = document.getElementById("barrier").value
var delta = document.getElementById("delta").value
var mu = document.getElementById("mu").value


var xArr = [-800, -784, -768, -752, -736, -720, -704, -688, -672, -656, -640, -624, -608, -592, -576, -560, -544, -528, -512, -496, -480, -464, -448, -432, -416, -400, -384, -368, -352, -336, -320, -304, -288, -272, -256, -240, -224, -208, -192, -176, -160, -144, -128, -112, -96, -80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464, 480, 496, 512, 528, 544, 560, 576, 592, 608, 624, 640, 656, 672, 688, 704, 720, 736, 752, 768, 784];
var yArr = conductance(barrier, mu, delta, xArr, 1, 1, 1e-8);
var xArr1 = []
for (let i in xArr) {
    xArr1[i] = xArr[i] / 10000
}

new Chart("myChart2", {
    type: "line",
    data: {
        labels: xArr1,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yArr
        }]
    },
    options: {
        legend: { display: false },
        scales: {xAxes: [{scaleLabel: {
            display: true,
            labelString: 'bias'
          } }],
            yAxes: [{scaleLabel: {
                display: true,
                labelString: 'conductance'
              }, ticks: { min: 0, max: 2 } }],
        },
        animation: {
            duration: 0
        }
    }
});

function change(input, div, n) {
    var value = parseFloat(document.getElementById(input).value);
    value = value.toFixed(n)
    document.getElementById(div).innerHTML = value;


    var barrier = document.getElementById("barrier").value
    var delta = document.getElementById("delta").value
    var mu = document.getElementById("mu").value


    var xArr = [-800, -784, -768, -752, -736, -720, -704, -688, -672, -656, -640, -624, -608, -592, -576, -560, -544, -528, -512, -496, -480, -464, -448, -432, -416, -400, -384, -368, -352, -336, -320, -304, -288, -272, -256, -240, -224, -208, -192, -176, -160, -144, -128, -112, -96, -80, -64, -48, -32, -16, 0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 416, 432, 448, 464, 480, 496, 512, 528, 544, 560, 576, 592, 608, 624, 640, 656, 672, 688, 704, 720, 736, 752, 768, 784];
    var yArr = conductance(barrier, mu, delta, xArr, 1, 1, 1e-8);
    var xArr1 = []
    for (let i in xArr) {
        xArr1[i] = xArr[i] / 10000
    }

    var graphContainer = document.getElementById('graphContainer2');
    graphContainer.innerHTML = '&nbsp;';
    graphContainer.innerHTML = '<canvas id="myChart2" style="width:130%;max-width:1200px"><canvas>';

    var myChart2 = document.getElementById("myChart2");
    var ctx = myChart2.getContext('2d')


    new Chart(ctx, {
        type: "line",
        data: {
            labels: xArr1,
            datasets: [{
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yArr
            }]
        },
        options: {
            legend: { display: false },
            scales: {xAxes: [{scaleLabel: {
                display: true,
                labelString: 'bias'
              } }],
                yAxes: [{scaleLabel: {
                    display: true,
                    labelString: 'k_x'
                  }, ticks: { min: 0, max: 2 } }],

            },
            animation: { duration: 0 }
        }
    })
}