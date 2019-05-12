


$(document).ready(function () {
    
    
    $('#btnSearch').click(() => {
        let startDate = $('#start').val();
        let endDate = $('#end').val();
        let currency = $('#currency').val();
        let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
        
        axios.get(url).
        then((response) => {
            let dates = Object.keys(response.data.bpi);
            let values = Object.values(response.data.bpi);
            drawCanvas(dates, values);
            // calcMaxAndMin(values);
        });
    });

    $('#currency').change(function () {

        if(startDate.length != 0 && endDate.length != 0) {
            let startDate = $('#start').val();
            let endDate = $('#end').val();
            let currency = $('#currency').val();
            let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
            axios.get(url).
            then((response) => {
                let dates = Object.keys(response.data.bpi);
                let values = Object.values(response.data.bpi);
                drawCanvas(dates, values,);
                // calcMaxAndMin(values);
            });
        } 
        
    });
});


function drawCanvas(dates, values) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...dates],
            datasets: [{
                label: '# of Votes',
                data: [...values],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function calcMaxAndMin(values) {
    let max = Math.max(...values);
    let min = Math.min(...values);
    $('#max').val(max);
    $('#min').val(min);
}