import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { TimeConverter } from '../../utils/TimeConverter';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

/**
 * ForecastChart — renders a combined bar+line chart showing temperature
 * and humidity trends for the next 10 forecast intervals (~30 hours).
 *
 * @param {Array}  weatherArr - Array of forecast data objects from OpenWeatherMap
 * @param {string} timezone   - UNIX timezone offset in seconds
 * @param {string} unit       - Temperature unit label (°C / °F / K)
 */
export const ForecastChart = ({ weatherArr, timezone, unit }) => {
    const degGraph  = [];
    const times     = [];
    const humiditys = [];

    // Extract temperature and humidity for the next 10 time intervals
    for (let index = 0; index < 10; index++) {
        const time = TimeConverter(weatherArr[index].dt, timezone).substring(11, 16);
        const { main } = weatherArr[index];
        times.push(time);
        degGraph.push(main.temp);
        humiditys.push(main.humidity);
    }

    const data = {
        labels: times,
        datasets: [
            {
                label: `Temp (${unit})`,
                data: degGraph,
                fill: true,
                backgroundColor: 'rgba(245, 131, 89, 0.5)',
                borderColor: 'rgb(255, 0, 0)',
                type: 'bar',
                yAxisID: 'y-temp',
            },
            {
                label: 'Humidity (%)',
                data: humiditys,
                fill: false,
                borderColor: 'rgb(0, 123, 255)',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                pointBackgroundColor: 'rgb(0, 123, 255)',
                pointBorderColor: 'rgb(255, 255, 255)',
                tension: 0.4,
                type: 'line',
                yAxisID: 'y-humidity',
            }
        ]
    };

    // Chart options — dual Y axes, responsive legend, mobile-friendly fonts
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    // Smaller legend on mobile to prevent overflow
                    font: { size: window.innerWidth < 500 ? 10 : 12 },
                    boxWidth: window.innerWidth < 500 ? 12 : 20,
                    padding: window.innerWidth < 500 ? 6 : 10,
                }
            },
            tooltip: {
                // Show both datasets in the same tooltip for easier comparison
                mode: 'index',
                intersect: false,
            },
        },
        elements: {
            point: {
                radius: window.innerWidth < 500 ? 3 : 5,
                hoverRadius: window.innerWidth < 500 ? 5 : 8,
                borderWidth: 2,
                hoverBorderWidth: 3
            }
        },
        scales: {
            'y-temp': {
                beginAtZero: true,
                position: 'left',
                title: {
                    display: window.innerWidth >= 500,
                    text: `Temp (${unit})`,
                    color: 'rgb(255, 0, 0)',
                    font: { size: 11 }
                },
                ticks: {
                    color: 'rgb(255, 0, 0)',
                    font: { size: window.innerWidth < 500 ? 9 : 11 },
                    maxTicksLimit: 6,
                }
            },
            'y-humidity': {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: window.innerWidth >= 500,
                    text: 'Humidity (%)',
                    color: 'rgb(0, 123, 255)',
                    font: { size: 11 }
                },
                ticks: {
                    color: 'rgb(0, 123, 255)',
                    font: { size: window.innerWidth < 500 ? 9 : 11 },
                    maxTicksLimit: 6,
                },
                grid: { drawOnChartArea: false }
            },
            x: {
                ticks: {
                    font: { size: window.innerWidth < 500 ? 9 : 11 },
                    maxRotation: 45,
                }
            }
        }
    };

    return (
        <div className='type-1-chart'>
            <Bar data={data} options={options} />
        </div>
    );
};