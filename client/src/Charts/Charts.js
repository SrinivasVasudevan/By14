import React, { useCallback } from 'react'
import './Charts.css';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

function Charts(props) {
    console.log(props)
    const {testData:transactions} = props;
    const infoDate = new Date();
    const noOfDays =  new Date(infoDate.getFullYear(), infoDate.getMonth()+1, 0).getDate();

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    } 
    const labelArray = [...Array(noOfDays).keys()].map(val=>val+1);
    labelArray.splice(0,0,0);
    const transactionParsed = transactions?.map(trans=>trans.price);
    transactionParsed.splice(0,0,0);
    const chartData = {
        labels: labelArray,
        datasets: [
            {
                label: 'Transactions this month',
                data: transactionParsed,
                cubicInterpolationMode: 'monotone',
                fill: true,
                
            }
        ]
    }
    
    return (
        <div className='transactionChart'>
            <Line data={chartData} options={chartOptions} width={'100%'} height={'100%'}/>
        </div>
    )
}

export default Charts;
