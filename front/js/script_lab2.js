import {create_datasets_sin, myChart_sin, myChart} from "./script_diagram2.js";

const input_t = document.querySelector('[id="T"]')
const input_h = document.querySelector('[id="h"]')
const input_t1 = document.querySelector('[id="t1"]')
const input_t2 = document.querySelector('[id="t2"]')
const input_t3 = document.querySelector('[id="t3"]')
const table = document.querySelector(".first-table")

const btn = document.querySelector(".border-button")

const formula_slider_ak = document.querySelector('[class = "formulas_ak"]')
const formula_slider_bk = document.querySelector('[class = "formulas_bk"]')
const formula_slider_ck = document.querySelector('[class = "formulas_ck"]')
const formula_slider_akc = document.querySelector('[class = "formulas_akc"]')

const formula_a0 = document.querySelector('[id="formula_a0"]')
const formula_b0 = document.querySelector('[id="formula_b0"]')
const formula_c0 = document.querySelector('[id="formula_c0"]')
const formula_w0 = document.querySelector('[id="formula_w0"]')

let sin_formulas


btn.addEventListener("click", function () {
    if (!(!input_t.value || !input_t1.value || !input_t2.value || !input_t3.value || !input_h.value)) {
        gen_formulas_ak(input_t.value, input_t1.value, input_h.value)
        gen_formulas_bk(input_t.value, input_t2.value, input_h.value)
        gen_formulas_ck(input_t.value, input_t3.value, input_h.value)
        gen_formulas_akc()


        formula_w0.textContent = `\\({w}_{0} = \\frac{2*3.14}{${input_t.value}} = ${search_w0(input_t.value).toFixed(2)}\\)`
        formula_a0.textContent = `\\({A}_{0} = ${input_h.value}*\\frac{${input_t1.value}}{${input_t.value}} = ${search_a0(input_t.value, input_t1.value, input_h.value).toFixed(2)}\\)`
        formula_b0.textContent = `\\({B}_{0} = ${input_h.value}*\\frac{${input_t2.value}}{${input_t.value}} = ${search_a0(input_t.value, input_t2.value, input_h.value).toFixed(2)}\\)`
        formula_c0.textContent = `\\({C}_{0} = ${input_h.value}*\\frac{${input_t3.value}}{${input_t.value}} = ${search_a0(input_t.value, input_t3.value, input_h.value).toFixed(2)}\\)`


        gen_table()
        myChart.data.datasets[0].data = revers_abs(search_akc_array(
            math_fun(input_t.value, input_t1.value, input_h.value),
            math_fun(input_t.value, input_t2.value, input_h.value),
            math_fun(input_t.value, input_t3.value, input_h.value)))
        myChart.update()
        myChart_sin.data.datasets = create_datasets_sin(revers_abs(search_akc_array(
            math_fun(input_t.value, input_t1.value, input_h.value),
            math_fun(input_t.value, input_t2.value, input_h.value),
            math_fun(input_t.value, input_t3.value, input_h.value))))
        myChart_sin.update()
        MathJax.typeset()
        sin_formulas = document.querySelectorAll(".formula-akc")
        for (let i = 0, len = sin_formulas.length; i < len; i++) {
            sin_formulas[i].addEventListener("click", function () {
                for (let i = 0, len = sin_formulas.length; i < len; i++) {
                    myChart_sin.data.datasets[i].borderColor = 'rgb(110,110,110)';
                    myChart_sin.data.datasets[i].backgroundColor = 'rgb(110,110,110)';
                    sin_formulas[i].style = "color: black";
                }
                myChart_sin.data.datasets[i].borderColor = 'rgb(18,255,0)';
                myChart_sin.data.datasets[i].backgroundColor = 'rgb(18,255,0)'
                sin_formulas[i].style = "color: rgb(18,255,0)";
                myChart_sin.update()
            })
        }
    } else {
        alert("Упс, ви не ввели дані")
    }
})




let gen_formulas_ak = (t, ti, h) => {
    formula_slider_ak.innerHTML = ''
    const w0 = search_w0(t);
    for (let i = 1; i < 16; i++) {
        let formula_no_render = `\\({A}_{${i}} = 2*${h}\\frac{${ti}*sin(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})}{${t}*(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})} = ${math_fun_for_gen_formula(t, ti, h, i, w0)}\\)`
        formula_slider_ak.innerHTML += `<p class="formula">${formula_no_render}</p>`
    }
}

let gen_formulas_bk = (t, ti, h) => {
    formula_slider_bk.innerHTML = ''
    const w0 = search_w0(t);
    for (let i = 1; i < 16; i++) {
        let formula_no_render = `\\({B}_{${i}} = 2*${h}\\frac{${ti}*sin(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})}{${t}*(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})} = ${math_fun_for_gen_formula(t, ti, h, i, w0)}\\)`
        formula_slider_bk.innerHTML += `<p class="formula">${formula_no_render}</p>`
    }
}

let gen_formulas_ck = (t, ti, h) => {
    formula_slider_ck.innerHTML = ''
    const w0 = search_w0(t);
    for (let i = 1; i < 16; i++) {
        let formula_no_render = `\\({C}_{${i}} = 2*${h}\\frac{${ti}*sin(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})}{${t}*(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})} = ${math_fun_for_gen_formula(t, ti, h, i, w0)}\\)`
        formula_slider_ck.innerHTML += `<p class="formula">${formula_no_render}</p>`
    }
}

let gen_formulas_akc = () => {
    formula_slider_akc.innerHTML = ''
    let arr_ak = round_up(math_fun(input_t.value, input_t1.value, input_h.value));
    let arr_ab = round_up(math_fun(input_t.value, input_t2.value, input_h.value));
    let arr_ac = round_up(math_fun(input_t.value, input_t3.value, input_h.value));
    for (let i = 0; i < 16; i++) {
        let first_item, second_item
        if (arr_ab[i]<0){first_item = `(${arr_ab[i]})`}
        else{first_item = arr_ab[i]}
        if (arr_ac[i]<0){second_item = `(${arr_ac[i]})`
        }else{second_item = arr_ac[i]}

        let formula_no_render = `\\({A}_{kc${i}} = \\frac{${arr_ak[i]}+${first_item} + ${second_item}}{3}\\) = ${((+arr_ak[i] + +arr_ab[i]+ +arr_ac[i])/3).toFixed(2)}`
        formula_slider_akc.innerHTML += `<p class="formula-akc">${formula_no_render}</p>`
    }
}




let math_fun = (t, ti, h) => {
    const w0 = search_w0(t);
    const a0 = search_a0(t, ti, h);
    let result = []
    result[0] = a0
    for (let i = 1; i < 16; i++) {
        result[i] = 2 * h * ti * Math.sin(i * w0 * ti / 2) / (t * i * w0 * ti / 2)
    }
    return result
}

let gen_table = () => {
    table.innerHTML = `<tr>
                        <th>k</th>
                        <th>Ak</th>
                        <th>Bk</th>
                        <th>Ck</th>
                        <th>Akc</th>
                        <th>|Akc|</th>
                    </tr>`;
    let data1 = round_up(math_fun(input_t.value, input_t1.value, input_h.value));
    let data2 = round_up(math_fun(input_t.value, input_t2.value, input_h.value));
    let data3 = round_up(math_fun(input_t.value, input_t3.value, input_h.value));
    let array_akc = round_up(search_akc_array(data1, data2, data3))
    let revers_data = round_up(revers_abs(array_akc));

    for (let i = 0; i < 16; i++) {
        table.innerHTML += `<tr>
                        <td>${i}</td>
                        <td>${data1[i]}</td>
                        <td>${data2[i]}</td>
                        <td>${data3[i]}</td>
                        <td>${array_akc[i]}</td>
                        <td>${revers_data[i]}</td>
                    </tr>`
    }
}

let round_up = (array) => {
    let new_array = []
    for (let i = 0; i < array.length; i++) {
        new_array[i] = array[i].toFixed(2)
    }
    return new_array
}

let revers_abs = (array) => {
    let result_abs = []
    for (let i = 0; i < array.length; i++) {
        result_abs[i] = Math.abs(array[i])
    }
    return result_abs
}

let search_w0 = (t) => {
    return 2 * Math.PI / t
}

let search_a0 = (t, ti, h) => {
    return h * ti / t
}

let search_akc = (ak, bk, ck) => {
    return (+ak + +bk + +ck) / 3
}

let search_akc_array = (array_ak, array_bk, array_ck) => {
    let result = []
    for (let i = 0; i < 16; i++) {
        result[i] = search_akc(array_ak[i], array_bk[i], array_ck[i])
    }
    return result
}

let math_fun_for_gen_formula = (t, ti, h, i, w0) => {
    return (2 * h * ti * Math.sin(i * w0 * ti / 2) / (t * i * w0 * ti / 2)).toFixed(2)
}