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

function dispersion(A, B, N) {
    var hk = []
    for (let i = -50; i < 51; i++) {
        var H = generate(A, B, N, i * 2 * Math.PI / 100)
        var ans = math.eigs(H)
        hk.push(ans.values)
    } return hk
}
