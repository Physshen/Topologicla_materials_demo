function SC_00(mu) { //是超导部分每一列的哈密顿量 hopping是y方向的
    var h00 = [[-mu, 0], [0, mu]]
    return h00
}

function SC_01(t, delta) { //超导列与列之间的耦合  0代表左边一列，1代表右边一列
    var h01 = [[-t, math.complex(0, -delta)], [math.complex(0, -delta), t]]
    return h01
}

function central_00(barrier, mu) {
    var H0 = [[barrier - mu, 0], [0, mu - barrier]] //onsite energy
    return H0
}

function surface_GF(H00, H01, E, max_iter = 100, converge_eps = 1e-10) {
    var dim = H00.length;
    var Ha = H00;
    var Hb = H00;
    var A = H01;
    var B = math.ctranspose(H01);
    var g

    for (let i = 0; i < max_iter; i++) {

        if (arrayMaxAbs(B) < converge_eps) {
            break
        }
        g = math.inv(addMatrix(math.multiply(E, constructIdentity(dim)), Hb, 'minus'))
        Ha = addMatrix(Ha, math.multiply(math.multiply(A, g), B))
        Hb = addMatrix(Hb, addMatrix(math.multiply(math.multiply(A, g), B), math.multiply(math.multiply(B, g), A)))
        A = math.multiply(math.multiply(A, g), A)
        B = math.multiply(math.multiply(B, g), B)

        if ((i + 1) == max_iter) {
            window.alert('inv_tridiagonal_matrix() maybe not converge')
        }
    }
    G00 = math.inv(addMatrix(math.multiply(E, constructIdentity(dim)), Ha, 'minus'))
    return G00
}

// calculate transmission
function conductance(barrier, mu, delta, energy, w, t, energy_epsj) {

    var ham_left_intra = SC_00(mu)  //内部
    var ham_left_inter = math.ctranspose(SC_01(t, 0)) //列与列

    var ham_right_intra = SC_00(mu)//内部
    var ham_right_inter = SC_01(t, delta)//列与列

    var ham_central_left = math.ctranspose(SC_01(t, 0))
    var ham_central_right = SC_01(t, delta)

    var transmission = []
    var tran = 0

    for (let i in energy) {
        var energy_i = energy[i] / 10000

        var energyEye1 = math.kron([[1, 0], [0, 1]], math.multiply(math.complex(energy_i, energy_epsj), constructIdentity(w)));

        var G00_left = surface_GF(ham_left_intra, ham_left_inter, energyEye1, max_iter = 100, converge_eps = 1e-8)
        //表面格林函数
        var self_energy_left = math.multiply(ham_central_left, math.multiply(G00_left, math.ctranspose(ham_central_left)))
        //自能
        var gama_left = math.multiply(math.complex(0, 1), addMatrix(self_energy_left, math.ctranspose(self_energy_left), 'minus'))
        //左展宽函数gama

        var G00_right = surface_GF(ham_right_intra, ham_right_inter, energyEye1, max_iter = 100, converge_eps = 1e-8)
        //表面格林函数
        var self_energy_right = math.multiply(ham_central_right, math.multiply(G00_right, math.ctranspose(ham_central_right)))
        //自能
        var gama_right = math.multiply(math.complex(0, 1), addMatrix(self_energy_right, math.ctranspose(self_energy_right), 'minus'))
        //右展宽函数gama

        var inv_Green = addMatrix(addMatrix(addMatrix(energyEye1, central_00(barrier, mu), 'minus'), self_energy_left, 'minus'), self_energy_right, 'minus')

        var Gr = math.inv(inv_Green)
        var dim = Gr.length

        var Gr_eh = sliceMatrix(Gr, 0, Math.floor(dim / 2), Math.floor(dim / 2), dim)
        var Gr_ee = sliceMatrix(Gr, 0, Math.floor(dim / 2), 0, Math.floor(dim / 2))

        var Ga = math.ctranspose(Gr)

        var Ga_he = sliceMatrix(Ga, Math.floor(dim / 2), dim, 0, Math.floor(dim / 2))
        var Ga_ee = sliceMatrix(Ga, 0, Math.floor(dim / 2), 0, Math.floor(dim / 2))

        var gama_left_e = sliceMatrix(gama_left, 0, Math.floor(dim / 2), 0, Math.floor(dim / 2))
        var gama_left_h = sliceMatrix(gama_left, Math.floor(dim / 2), dim, Math.floor(dim / 2), dim)
        var gama_right_e = sliceMatrix(gama_right, 0, Math.floor(dim / 2), 0, Math.floor(dim / 2))

        var Andreev = math.trace(
            math.multiply(math.multiply(math.multiply(gama_left_e, Gr_eh), gama_left_h), Ga_he))  //Fisher_Lee关系

        var trans_e = math.trace(sliceMatrix(
            math.multiply(math.multiply(math.multiply(gama_left, Gr), gama_right), Ga), 0, Math.floor(dim / 2), 0, Math.floor(dim / 2)))

        if (math.abs(math.re(Andreev)) > math.abs(tran)) {
            tran = Andreev
        }
        if (math.im(Andreev) > 1e-5) {
            window.alert('large imag part when calculate energy=' + energy_i)
        }

        transmission.push(math.complex(math.re(trans_e) + 2 * math.re(Andreev), math.im(trans_e)))//透射率，取实部
    }
    return transmission
}