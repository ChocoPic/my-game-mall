import React from 'react';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    ArcElement,
    Tooltip, 
    Legend,
    Title,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement, 
    ArcElement,
    Tooltip, 
    Legend,
    Title
);


const MyChart = ({data, title, type}) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    if(type=='bar')
        return <Bar options={options} data={data} title={title}/>;

    else if(type=='doughnut')
        return <Doughnut options={options} data={data} title={title}/>;
}
export default MyChart;
