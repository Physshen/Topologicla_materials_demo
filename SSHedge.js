var j1j2Range = document.getElementById("j1j2ratio");
var gamma = document.getElementById("gamma");
var gamma_range = document.getElementById("gamma_range");
var An = document.getElementById("A");
var Bn = document.getElementById("B");
var Nn = document.getElementById("N");
var A_range = document.getElementById("A_range");
var B_range = document.getElementById("B_range");
var N_range = document.getElementById("N_range");
var j1vj2 = document.getElementById("j1vj2");
var canvasp1 = document.getElementById("Plot1sc");
var ctx1 = canvasp1.getContext("2d");
var canvasp2 = document.getElementById("Plot2sc");
var ctx2 = canvasp2.getContext("2d");
var canvasp3 = document.getElementById("Plot3sc");
var ctx3 = canvasp3.getContext("2d");
var canvasp4 = document.getElementById("BHZplot");
var ctx4 = canvasp4.getContext("2d");
var grd = ctx4.createLinearGradient(935,150,935,400);
grd.addColorStop(0, "red");
grd.addColorStop(1, "rgba(0,0,255,0.7)");
var j2 = 1;
var j1 = 0.5;
var L = 30;
var ga = 0.2;
var A = 1.2;
var B = 0.8;
var N = 9;
var h4 = 18;
var r4 = h4/2;
var LL = 40;
var hEdge1 = 150,
    vEdge1 = 100,
    xAxisL1 = canvasp1.width - 2 * hEdge1,
    yAxisL1 = canvasp1.height - 2 * vEdge1;
const sigma_x = [[0, 1], [1, 0]];
const sigma_y = [[0, math.complex(0, -1)], [math.complex(0, 1), 0]];
const sigma_z = [[1, 0], [0, -1]];
var sButton1 = document.getElementById("scPlot1");
var sButton2 = document.getElementById("scPlot2");

function Hssh(j1, j2, L) {
    let H = constructZero(num = 2 * L);
    for (let i = 0; i < L; i++) {
        H[2 * i][2 * i + 1] = -j1;
        H[2 * i + 1][2 * i] = -j1;
    }
    for (let i = 1; i < 2 * L - 1; i = i + 2) {
        H[i][i + 1] = -j2;
        H[i + 1][i] = -j2;
    }
    return H
}

function NH_Hssh(j1, j2, gamma, L) {
    let H = constructZero(num = 2 * L);
    for (let i = 1; i < L+1; i++) {
        H[i-1][i-1+L] = -(j1+gamma);
        H[i-1+L][i-1] = -(j1-gamma);
    }
    for (let i = 1; i < L; i++) {
        H[i-1+L][i] = -j2;
        H[i][i-1+L] = -j2;
    }
    return H
}

function drawLine1(x1, y1, x2, y2, w, c) {
    ctx1.save();

    ctx1.beginPath();
    ctx1.moveTo(x1, y1);
    ctx1.lineTo(x2, y2);

    ctx1.lineWidth = w;
    ctx1.strokeStyle = c;
    ctx1.stroke();

    ctx1.restore();
}

function drawLine2(x1, y1, x2, y2, w, c) {
    ctx2.save();

    ctx2.beginPath();
    ctx2.moveTo(x1, y1);
    ctx2.lineTo(x2, y2);

    ctx2.lineWidth = w;
    ctx2.strokeStyle = c;
    ctx2.stroke();

    ctx2.restore();
}

function drawLine3(x1, y1, x2, y2, w, c) {
    ctx3.save();

    ctx3.beginPath();
    ctx3.moveTo(x1, y1);
    ctx3.lineTo(x2, y2);

    ctx3.lineWidth = w;
    ctx3.strokeStyle = c;
    ctx3.stroke();

    ctx3.restore();
}

function drawLine4(x1, y1, x2, y2, w, c) {
    ctx4.save();

    ctx4.beginPath();
    ctx4.moveTo(x1, y1);
    ctx4.lineTo(x2, y2);

    ctx4.lineWidth = w;
    ctx4.strokeStyle = c;
    ctx4.stroke();

    ctx4.restore();
}

function FillCirc(x,y,r,fsty){
    ctx4.save();
    ctx4.beginPath();
    ctx4.arc(x,y,r,0,2*Math.PI);
    ctx4.fillStyle = fsty;
    ctx4.fill();
    ctx4.restore();
}

function drawFrame1() {
    drawLine1(hEdge1, vEdge1, hEdge1 + xAxisL1, vEdge1, 1, "black");
    drawLine1(hEdge1 + xAxisL1, vEdge1, hEdge1 + xAxisL1, vEdge1 + yAxisL1, 1, "black");
    drawLine1(hEdge1 + xAxisL1, vEdge1 + yAxisL1, hEdge1, vEdge1 + yAxisL1, 1, "black");
    drawLine1(hEdge1, vEdge1 + yAxisL1, hEdge1, vEdge1, 1, "black");
    draw1Text("20px Times New Roman", "black", "1", hEdge1-10, vEdge1+yAxisL1+20);
    draw1Text("20px Times New Roman", "black", "30", hEdge1+xAxisL1-10, vEdge1+yAxisL1+20);;
    draw1Text("20px Times New Roman", "black", "10", hEdge1+xAxisL1/3-10, vEdge1+yAxisL1+20);
    draw1Text("20px Times New Roman", "black", "20", hEdge1+2*xAxisL1/3-10, vEdge1+yAxisL1+20);
    draw1Text("25px Times New Roman", "black", "lattice site", hEdge1+xAxisL1/2-50, vEdge1+yAxisL1+66);
    draw1Text("25px Times New Roman", "black", "a.u.", hEdge1-66, vEdge1+yAxisL1/2+10);
}

function drawFrame2() {
    drawLine2(hEdge1, vEdge1, hEdge1 + xAxisL1, vEdge1, 1, "black");
    drawLine2(hEdge1 + xAxisL1, vEdge1, hEdge1 + xAxisL1, vEdge1 + yAxisL1, 1, "black");
    drawLine2(hEdge1 + xAxisL1, vEdge1 + yAxisL1, hEdge1, vEdge1 + yAxisL1, 1, "black");
    drawLine2(hEdge1, vEdge1 + yAxisL1, hEdge1, vEdge1, 1, "black");
    draw2Text("20px Times New Roman", "black", "1", hEdge1-5, vEdge1+yAxisL1+20);
    draw2Text("20px Times New Roman", "black", "3", hEdge1+2*xAxisL1/9-5, vEdge1+yAxisL1+20);
    draw2Text("20px Times New Roman", "black", "5", hEdge1+4*xAxisL1/9-5, vEdge1+yAxisL1+20);
    draw2Text("20px Times New Roman", "black", "7", hEdge1+6*xAxisL1/9-5, vEdge1+yAxisL1+20);
    draw2Text("20px Times New Roman", "black", "9", hEdge1+8*xAxisL1/9-5, vEdge1+yAxisL1+20);
    draw2Text("25px Times New Roman", "black", "a.u.", hEdge1-66, vEdge1+yAxisL1/2+10);
    draw2Text("25px Times New Roman", "black", "lattice site", hEdge1+xAxisL1/2-50, vEdge1+yAxisL1+66);
    draw2Text("20px Times New Roman","black","非厄米SSH模型本征波函数的分布",hEdge1/2,vEdge1/2+8);
}

function draw1Text(font,fStyle,text,x,y){
    ctx1.save();

    ctx1.font = font;
    ctx1.fillStyle = fStyle;
    ctx1.fillText(text,x,y);

    ctx1.restore();
}

function draw2Text(font,fStyle,text,x,y){
    ctx2.save();

    ctx2.font = font;
    ctx2.fillStyle = fStyle;
    ctx2.fillText(text,x,y);

    ctx2.restore();
}

function draw3Text(font,fStyle,text,x,y){
    ctx3.save();

    ctx3.font = font;
    ctx3.fillStyle = fStyle;
    ctx3.fillText(text,x,y);

    ctx3.restore();
}

function draw4Text(font,fStyle,text,x,y){
    ctx4.save();

    ctx4.font = font;
    ctx4.fillStyle = fStyle;
    ctx4.fillText(text,x,y);

    ctx4.restore();
}

function draw3Circ(x,y,r,w,c){
    ctx3.save();

    ctx3.beginPath();
    ctx3.arc(x,y,r,0,2*Math.PI);
    
    ctx3.lineWidth = w;
    ctx3.strokeStyle = c;
    ctx3.stroke();

    ctx3.restore();
}

function draw1Legend(){
    drawLine1(hEdge1+xAxisL1/3,vEdge1/2,hEdge1+xAxisL1/3+60,vEdge1/2,1,"red");
    drawLine1(hEdge1+2*xAxisL1/3,vEdge1/2,hEdge1+2*xAxisL1/3+60,vEdge1/2,1,"blue");
    draw1Text("20px Times New Roman", "black", "零能模式", hEdge1+xAxisL1/3+70, vEdge1/2+8);
    draw1Text("20px Times New Roman", "black", "其它模式", hEdge1+2*xAxisL1/3+70, vEdge1/2+8);
    draw1Text("20px Times New Roman","black","SSH模型本征波函数的分布",hEdge1/2,vEdge1/2+8);
}

function drawEigstates(cf) {
    for (let x = 0; x < 2*L; x++) {
        let eigsyst = math.eigs(Hssh(j1, j2, L))["vectors"];
        let ampLst = [];
        let eigvt = eigsyst.map(function(value) { return value[x]; });
        for (let i = 1; i < L + 1; i++) {
            ampLst.push(eigvt[2 * (i - 1)]**2 + eigvt[2 * i - 1]**2)
        }
        if ((x==0)||(x==1)) {
            for (let j = 1; j < L; j++) {
                drawLine1(hEdge1+((xAxisL1*(j-1))/(L-1)),vEdge1+yAxisL1*((cf-ampLst[j-1])/(cf)),hEdge1+((xAxisL1*j)/(L-1)),vEdge1+yAxisL1*((cf-ampLst[j])/(cf)),0.5,"red")
            }
        } else {
            for (let j = 1; j < L; j++) {
                drawLine1(hEdge1+((xAxisL1*(j-1))/(L-1)),vEdge1+yAxisL1*((cf-ampLst[j-1])/(cf)),hEdge1+((xAxisL1*j)/(L-1)),vEdge1+yAxisL1*((cf-ampLst[j])/(cf)),0.5,"blue")
            }
        }
        ctx1.clearRect(hEdge1,0,xAxisL1,vEdge1);
    }
}

function drawNHEigs(cf){
    let eigsyst = math.eigs(NH_Hssh(0.5,1,ga,5))["vectors"];
    for (let i = 0; i < 6; i++) {
        let wf = eigsyst.map(function(value) { return value[i]; });
        wf = math.multiply(1/math.norm(wf),wf);
        let ampLst = [wf[0]**2,wf[5]**2,wf[1]**2,wf[6]**2,wf[2]**2,wf[7]**2,wf[3]**2,wf[8]**2,wf[4]**2,wf[9]**2];
        for (let i = 1; i < ampLst.length+1; i++) {
            drawLine2(hEdge1+((xAxisL1*(i-1))/9),vEdge1+yAxisL1*((cf-ampLst[i-1])/(cf)),hEdge1+((xAxisL1*i)/9),vEdge1+yAxisL1*((cf-ampLst[i])/(cf)),0.5,"blue")
        }
    }
}

function draw3plot(j1){
    drawLine3(hEdge1,vEdge1+yAxisL1/2,hEdge1+xAxisL1,vEdge1+yAxisL1/2,1,"black");
    drawLine3(hEdge1+xAxisL1,vEdge1+yAxisL1/2,hEdge1+xAxisL1-15,vEdge1+yAxisL1/2+6,"black");
    drawLine3(hEdge1+xAxisL1,vEdge1+yAxisL1/2,hEdge1+xAxisL1-15,vEdge1+yAxisL1/2-6,"black");
    drawLine3(hEdge1+xAxisL1/2,vEdge1+yAxisL1,hEdge1+xAxisL1/2,vEdge1,1,"black");
    drawLine3(hEdge1+xAxisL1/2,vEdge1,hEdge1+xAxisL1/2+6,vEdge1+15,1,"black");
    drawLine3(hEdge1+xAxisL1/2,vEdge1,hEdge1+xAxisL1/2-6,vEdge1+15,1,"black");
    let r = yAxisL1/4;
    if (j1<1) {
        draw3Circ(hEdge1+xAxisL1/2-r,vEdge1+yAxisL1/2,r*j1,1,"red");
    }
    else{
        draw3Circ(hEdge1+xAxisL1/2-r,vEdge1+yAxisL1/2,r*j1,1,"blue");
    }
    draw3Text("20px Times New Roman","black","D(k) 在复平面上的取值",hEdge1/2,vEdge1/2+8);
    drawLine3(hEdge1+xAxisL1/3,vEdge1/2,hEdge1+xAxisL1/3+60,vEdge1/2,1,"red");
    drawLine3(hEdge1+2*xAxisL1/3,vEdge1/2,hEdge1+2*xAxisL1/3+60,vEdge1/2,1,"blue");
    draw3Text("20px Times New Roman", "black", "有边界态", hEdge1+xAxisL1/3+70, vEdge1/2+8);
    draw3Text("20px Times New Roman", "black", "无边界态", hEdge1+2*xAxisL1/3+70, vEdge1/2+8);
    drawLine3(hEdge1+xAxisL1/2-r,vEdge1+yAxisL1/2+2,hEdge1+xAxisL1/2-r,vEdge1+yAxisL1/2-2,1,"black");
    draw3Text("italic 20px Times New Roman", "black", "-J", hEdge1+xAxisL1/2-r-9,vEdge1+yAxisL1/2-7);
    draw3Text("12px Times New Roman", "black", "1", hEdge1+xAxisL1/2-r+7,vEdge1+yAxisL1/2-5);
    draw3Text("20px Times New Roman", "black", "Re", hEdge1+xAxisL1-25,vEdge1+yAxisL1/2+25);
    draw3Text("20px Times New Roman", "black", "Im", hEdge1+xAxisL1/2+20,vEdge1+25);
}

function generate(A, B, N, kx) {
    var H_jj = addMatrix(math.multiply(A * Math.sin(kx), sigma_x), math.multiply((1 - 2 * B * (2 - Math.cos(kx))), sigma_z))
    var H_jplus = addMatrix(math.multiply(B, sigma_z), math.multiply(math.complex(0, A / 2), sigma_y), 'minus')
    var H_jminus = addMatrix(math.multiply(B, sigma_z), math.multiply(math.complex(0, A / 2), sigma_y))
    var H = []
    for (let i = 0; i < N; i++) {
        var row = [[], []]
        for (let j = 0; j < N; j++) {
            if (i == j) {
                row[0] = row[0].concat(H_jj[0])
                row[1] = row[1].concat(H_jj[1])
            } else if (j == i + 1) {
                row[0] = row[0].concat(H_jminus[0])
                row[1] = row[1].concat(H_jminus[1])
            } else if (j == i - 1) {
                row[0] = row[0].concat(H_jplus[0])
                row[1] = row[1].concat(H_jplus[1])
            } else {
                row[0] = row[0].concat([0, 0])
                row[1] = row[1].concat([0, 0])
            }
        }
        H.push(row[0], row[1])
    } return H
}

function drawBHZedge(){
    let H = generate(A,B,N,0);
    let eigsys = math.eigs(H)["vectors"];
    let wfunc = eigsys.map(function(value) { return value[0]; });
    let hEdge = (canvasp4.width-h4*(LL-1))/2;
    let vEdge = (canvasp4.height-h4*(N-1))/2;
    let ampL = [];
    for (let i = 0; i < 2*N; i=i+2) {
        ampL.push(wfunc[i]**2);
    }
    let maxA = math.max(ampL);
    for (let i = 0; i < ampL.length; i++) {
        ampL[i] = ampL[i]/maxA;
    }
    for (let i = 1; i < LL+1; i++) {
        for (let j = 1; j < N+1; j++) {
            let rate = ampL[j-1];
            rate = rate**(1/3);
            FillCirc(hEdge+(i-1)*h4,vEdge+(j-1)*h4,r4,'rgba('+rate*255+',0,'+(1-rate)*255+','+(0.7+rate*0.3)+')');
        }
    }
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < N+1; j++) {
            let rate = ampL[j-1];
            rate = rate**(1/3);
            FillCirc(hEdge-i*h4,vEdge+(j-1)*h4,r4,'rgba('+rate*255+',0,'+(1-rate)*255+','+((1-0.8*i/3)*(0.7+rate*0.3))+')');
            FillCirc(hEdge+(LL-1)*h4+i*h4,vEdge+(j-1)*h4,r4,'rgba('+rate*255+',0,'+(1-rate)*255+','+((1-0.8*i/3)*(0.7+rate*0.3))+')');
        }
    }
    drawLine4(50,500,50,100,1,"black");
    drawLine4(50,100,55,120,1,"black");
    drawLine4(50,100,45,120,1,"black");
    drawLine4(50,500,700,500,1,"black");
    drawLine4(700,500,680,505,1,"black");
    drawLine4(700,500,680,495,1,"black");
    draw4Text("italic 30px Times New Roman","black","x",720,510);
    draw4Text("italic 30px Times New Roman","black","y",46,90);
    draw4Text("30px Times New Roman","black","BHZ 纳米带的零模分布",340,90);
    draw4Text("30px Times New Roman","black","1",942,140);
    draw4Text("30px Times New Roman","black","0",942,480);
    ctx4.save();
    ctx4.fillStyle = grd;
    ctx4.fillRect(935,150,30,300);
    ctx4.restore();
}

j1j2Range.onchange = function (e) {
    j1 = Number(j1j2Range.value);
    j1vj2.innerHTML = j1j2Range.value;
    ctx3.clearRect(0,0,canvasp3.width,canvasp3.height);
    draw3plot(j1);
}

gamma_range.onchange = function (e) {
    ga = Number(gamma_range.value);
    gamma.innerHTML = gamma_range.value;
}

A_range.onchange = function (e) {
    A = Number(A_range.value);
    An.innerHTML = A_range.value;
    ctx4.clearRect(0,0,canvasp4.width,canvasp4.height);
    drawBHZedge();
}

B_range.onchange = function (e) {
    B = Number(B_range.value);
    Bn.innerHTML = B_range.value;
    ctx4.clearRect(0,0,canvasp4.width,canvasp4.height);
    drawBHZedge();
}

N_range.onchange = function (e) {
    N = Number(N_range.value);
    Nn.innerHTML = N_range.value;
    ctx4.clearRect(0,0,canvasp4.width,canvasp4.height);
    drawBHZedge();
}

sButton1.onclick = function(e){
    ctx1.clearRect(0,0,canvasp1.width,canvasp1.height);
    drawFrame1();
    drawEigstates(0.2);
    draw1Legend();
}

sButton2.onclick = function(e){
    ctx2.clearRect(0,0,canvasp2.width,canvasp2.height);
    drawFrame2();
    drawNHEigs(1.0);
}

draw3plot();