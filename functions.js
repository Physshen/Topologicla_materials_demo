function range(start, end, num) {
    var arr = []
    var step = (end - start) / num
    var n = start - step
    for (let i = 0; i < num; i++) {
        n += step;
        rn = n;
        arr.push([rn]);
    }
    return arr
}

const constructIdentity = (num = 1) => {
    const res = [];
    for (let i = 0; i < num; i++) {
        if (!res[i]) {
            res[i] = [];
        };
        for (let j = 0; j < num; j++) {
            if (i === j) {
                res[i][j] = 1;
            } else {
                res[i][j] = 0;
            };
        };
    };
    return res;
};

const constructZero = (num = 1) => {
    const res = [];
    for (let i = 0; i < num; i++) {
        if (!res[i]) {
            res[i] = [];
        };
        for (let j = 0; j < num; j++) {
            res[i][j] = 0;
        };
    };
    return res;
};

function diag(matrix, precision = -10) { //对角化
    const H = matrix
    const ans = math.eigs(H) // returns {values: [E1,E2...sorted], vectors: [v1,v2.... corresponding vectors as columns]}
    const U = ans.vectors
    const UTxHxU = math.multiply(math.inv(U), H, U) // diagonalizes H
    const length = UTxHxU.length
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (math.abs(UTxHxU[i][j]) < 10 ** (precision)) {
                UTxHxU[i][j] = 0
            }
        }
    }
    return UTxHxU
}

function arrayMaxAbs(matrix) { //矩阵值的绝对值的最大值
    let arr = [].concat(...matrix);
    let len = arr.length;
    let max = math.abs(arr[0]);
    for (let i = 0; i < len; i++) {
        arr[i] = math.abs(arr[i])
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function addMatrix(A, B, type) {
    var n = A.length;
    var N = [];
    for (var i = 0; i < n; i++) {
        N[i] = [];
        for (var j = 0; j < n; j++) {
            if (type === 'minus') {
                N[i][j] = math.complex(math.re(A[i][j]) - math.re(B[i][j]), math.im(A[i][j]) - math.im(B[i][j]))
            } else {
                N[i][j] = math.complex(math.re(A[i][j]) + math.re(B[i][j]), math.im(A[i][j]) + math.im(B[i][j]))
            }
        }
    }
    return N;
}

function sliceMatrix(matrix, start, end, start1 = start, end1 = end) {
    var newMatrix = []
    var row = []
    var sliceRow
    var newRow
    for (let i = start; i < end; i++) {
        row = matrix[i]
        sliceRow = row.slice(start1, end1)
        newRow = [sliceRow]
        newMatrix = newMatrix.concat(newRow)
    }
    return newMatrix
}

