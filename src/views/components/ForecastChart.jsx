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

// Register all required Chart.js components
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
    const degGraph   = [];
    const times      = [];
    const humiditys  = [];

    // Extract temperature and humidity for the next 10 time intervals
    for (let index = 0; index < 10; index++) {
        const time = TimeConverter(weatherArr[index].dt, timezone).substring(11, 16);
        const { main } = weatherArr[index];
        times.push(time);
        degGraph.push(main.temp);
        humiditys.push(main.humidity);
    }

    // Chart.js dataset configuration
    const data = {
        labels: times,
        datasets: [
            {
                label: `Temperature (${unit})`,
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

    // Chart options — dual Y axes for temperature (left) and humidity (right)
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                // Show both datasets in the same tooltip for easier comparison
                mode: 'index',
                intersect: false,
            },
        },
        elements: {
            point: {
                radius: 5,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 3
            }
        },
        scales: {
            'y-temp': {
                beginAtZero: true,
                position: 'left',
                title: {
                    display: true,
                    text: `Temperature (${unit})`,
                    color: 'rgb(255, 0, 0)'
                },
                ticks: { color: 'rgb(255, 0, 0)' }
            },
            'y-humidity': {
                beginAtZero: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Humidity (%)',
                    color: 'rgb(0, 123, 255)'
                },
                ticks: { color: 'rgb(0, 123, 255)' },
                // Prevent humidity grid lines from overlapping temperature grid
                grid: { drawOnChartArea: false }
            }
        }
    };

    return (
        <div className='type-1-chart'>
            <Bar data={data} options={options} />
        </div>
    );
};