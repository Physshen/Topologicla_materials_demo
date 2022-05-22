function generate2(esite, delta2, n2, kx) {
    var H = constructZero(2 * n2)
    const t = 1
    for (i = 0; i < n2; i++) {
        H[i][i] = esite + 2 * t * (Math.cos(kx)-1)
        H[i + n2][i + n2] = - esite - 2 * t * (Math.cos(kx)-1)

        H[i][i + n2] = 2 * delta2 * Math.sin(kx)
        H[i + n2][i] = 2 * delta2 * Math.sin(kx)
    }

    for (i = 0; i < n2 - 1; i++) {
        H[i][i + 1] = t
        H[i + 1][i] = t

        H[i][i + 1 + n2] = - delta2
        H[i + 1 + n2][i] = - delta2
    }

    for (i = n2; i < 2 * n2 - 1; i++) {
        H[i][i + 1] = - t
        H[i + 1][i] = - t

        H[i][i + 1 - n2] = delta2
        H[i + 1 - n2][i] = delta2
    } return H
}

function dispersion2(esite, delta2, n2) {
    var hk = []
    for (let i = -50; i < 51; i++) {
        var H = generate2(esite, delta2, n2, i * 2 * Math.PI / 100)
        var ans = math.eigs(H)
        hk.push(ans.values)
    } return hk
}
