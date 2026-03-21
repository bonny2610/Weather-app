import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

import "../../assets/styles/Chart.css";

const SpecificChart = ({ verticalVars, horizontalVars, name, typeChart, color, borderColor, unit }) => {

    const selectedGraph = (typeChart, name) => {
        if (typeChart === "Line") {
            return (
                <div className='type-2-chart'>
                    <Line key={name} data={data} options={options}></Line>
                </div>
            )
        } else if (typeChart === "Chart" || typeChart === "Bar") {
            return (
                <div className='type-2-chart'>
                    <Bar key={name} data={data} options={options}></Bar>
                </div>
            )
        } else if (typeChart === "HorizontalBar") {
            return (
                <div className='type-2-chart'>
                    <Bar key={name} data={data} options={horizontalOptions}></Bar>
                </div>
            )
        }
    }

    const data = {
        labels: verticalVars,
        datasets: [
            {
                label: name + " " + "(" + unit + ")",
                data: horizontalVars,
                fill: true,
                backgroundColor: color,
                borderColor: borderColor,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 3
            }
        }
    };

    const horizontalOptions = {
        ...options,
        indexAxis: 'y'
    };

    return selectedGraph(typeChart, name);
}

export default SpecificChart;