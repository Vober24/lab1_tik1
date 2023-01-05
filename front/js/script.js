import {create_datasets_sin, myChart, myChart_sin} from "./script_diagram.js";


const input_t = document.querySelector('[id="T"]')
const input_ti = document.querySelector('[id="ti"]')
const input_h = document.querySelector('[id="h"]')

const btn = document.querySelector(".border-button")
const table = document.querySelector(".first-table")

const formula_w0 = document.querySelector('[id="formula_w0"]')
const formula_a0 = document.querySelector('[id="formula_a0"]')
const formula_slider = document.querySelector('[id="formula_slider"]')

let sin_formulas

btn.addEventListener("click", function () {
    if (!input_t.value || !input_ti.value || !input_h.value) {
        alert("Упс, ви не ввели дані")

    } else {
        formula_w0.textContent = `\\({w}_{0} = \\frac{2*3.14}{${input_t.value}} = ${search_w0(input_t.value).toFixed(2)}\\)`
        formula_a0.textContent = `\\({A}_{0} = ${input_h.value}*\\frac{${input_ti.value}}{${input_t.value}} = ${search_a0(input_t.value, input_ti.value, input_h.value).toFixed(2)}\\)`
        gen_formulas(input_t.value, input_ti.value, input_h.value)
        gen_table()
        myChart.data.labels = revers_abs_for_diagram(input_t.value, input_ti.value, input_h.value);
        myChart.data.datasets[0].data = revers_abs(input_t.value, input_ti.value, input_h.value);
        myChart.update()
        myChart_sin.data.datasets = create_datasets_sin(revers_abs(input_t.value, input_ti.value, input_h.value));
        myChart_sin.update()
        MathJax.typeset()
        sin_formulas = document.querySelectorAll(".formula")
        console.log(sin_formulas.length)
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

    }
})


let gen_table = () => {
    table.innerHTML = `<tr>
                        <th>k</th>
                        <th>Ak</th>
                        <th>|Ak|</th>
                    </tr>`;
    for (let i = 0; i < 16; i++) {
        let data = round_up(math_fun(input_t.value, input_ti.value, input_h.value));
        let revers_data = round_up(revers_abs(input_t.value, input_ti.value, input_h.value));
        table.innerHTML += `<tr>
                        <td>${i}</td>
                        <td>${data[i]}</td>
                        <td>${revers_data[i]}</td>
                    </tr>`
    }
}



// let gen_table = () => {
//     table.innerHTML = `<tr>
//                         <th>k</th>
//                         <th>Ak</th>
//                         <th>|Ak|</th>
//                     </tr>`;
//     for (let i = 0; i < 16; i++) {
//         let data = round_up(math_fun(input_t.value, input_ti.value, input_h.value));
//         let revers_data = round_up(revers_abs(input_t.value, input_ti.value, input_h.value));
//         table.innerHTML += `<tr>
//                         <td>${i}</td>
//                         <td>${data[i]}</td>
//                         <td>${revers_data[i]}</td>
//                     </tr>`
//     }
// }

let gen_formulas = (t, ti, h) => {
    formula_slider.innerHTML = ''
    const w0 = search_w0(t);
    for (let i = 1; i < 16; i++) {
        let formula_no_render = `\\({A}_{${i}} = 2*${h}\\frac{${ti}*sin(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})}{${t}*(${i}*${w0.toFixed(2)}*\\frac{${ti}}{2})} = ${math_fun_for_gen_formula(t, ti, h, i, w0)}\\)`
        formula_slider.innerHTML += `<p class="formula">${formula_no_render}</p>`
    }
}

let math_fun_for_gen_formula = (t, ti, h, i, w0) => {
    return (2 * h * ti * Math.sin(i * w0 * ti / 2) / (t * i * w0 * ti / 2)).toFixed(2)
}


let round_up = (array) => {
    let new_array = []
    for (let i = 0; i < array.length; i++) {
        new_array[i] = array[i].toFixed(2)
    }
    return new_array
}

let search_w0 = (t) => {
    return 2 * Math.PI / t
}

let search_a0 = (t, ti, h) => {
    return h * ti / t
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

let revers_abs = (t, ti, h) => {
    let result = math_fun(t, ti, h)
    let result_abs = []
    for (let i = 0; i < 16; i++) {
        result_abs[i] = Math.abs(result[i])
    }
    return result_abs
}
let revers_abs_for_diagram = (t, ti, h) => {
    let result = math_fun(t, ti, h)
    let result_abs = []
    for (let i = 0; i < 16; i++) {
        result_abs[i] = `A${i} = ${Math.abs(result[i]).toFixed(2)}`
    }
    console.log(result_abs)
    return result_abs
}