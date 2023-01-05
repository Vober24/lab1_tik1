

const data = {
    labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    datasets: [{
        label: 'diagram',
        data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgb(255, 99, 132, 0.2)',
            'rgb(255, 159, 64, 0.2)',
            'rgb(255, 205, 86, 0.2)',
            'rgb(75, 192, 192, 0.2)',
            'rgb(54, 162, 235, 0.2)',
            'rgb(153, 102, 255, 0.2)',
            'rgb(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)'
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

export const myChart = new Chart(
    document.getElementById('myChart'),
    config
);



export let create_datasets_sin = (item_data_sin) =>{
    let datasets = []
    for(let i = 0; i<16; i++ ){
        datasets.push({
                label: `A${i}'`,
                data: [item_data_sin[i],  -item_data_sin[i],  item_data_sin[i], -item_data_sin[i], item_data_sin[i],  -item_data_sin[i],  item_data_sin[i], -item_data_sin[i]],
                borderColor: 'rgb(110,110,110)',
                borderWidth: 2,
                backgroundColor: 'rgb(110,110,110)',
                cubicInterpolationMode: 'monotone',
            })
    }
    return datasets
}


// ['p/2', 'p', '3p/2', '2p', '5p/2', '3p']
export const myChart_sin = new Chart(
    document.getElementById('myChart_sin'),
    {
        type: 'line',
        data: {
            labels: ['p/2', 'p', '3p/2', '2p'],
            datasets: create_datasets_sin(0)

        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);



