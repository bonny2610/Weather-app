import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import "../../assets/styles/ForecastContainer.css";

import humidIcon from "../../assets/icons/icons8-humidity-50.png";
import windIcon from "../../assets/icons/icons8-wind-50.png";
import snowIcon from '../../assets/icons/icons8-snow-50.png';
import rainIcon from '../../assets/icons/icons8-rain-50.png';

const Card = ({ date, icon, temps, unit, humidities, winds, rains, snows, times, windUnit }) => {
    const { setSelectedDay } = useContext(WeatherContext);

    let avgTemp = temps.reduce((sum, t) => sum + t, 0) / temps.length;
    let avgHumid = humidities.reduce((sum, t) => sum + t, 0) / humidities.length;
    let avgWinds = winds.reduce((sum, t) => sum + t, 0) / winds.length;
    let avgRains = rains.reduce((sum, t) => sum + t, 0) / rains.length;
    let avgSnow = snows.reduce((sum, t) => sum + t, 0) / snows.length;

    const hasRainsData = rains.some(value => value > 0);
    const hasSnowsData = snows.some(value => value > 0);

    return (
        <div className="weather-card" onClick={() => setSelectedDay({ date, temps, times, rains, snows, winds })}>
            <div className="weather-card-date">{date}</div>
            <hr />
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather-forecast-icon" className="weather-forecast-icon" />
            <hr />
            <div className="weather-card-temp">{avgTemp.toFixed(1)} {unit}</div>
            <div className="details-info">
                <div className="details-info-row">
                    <img src={humidIcon} alt="humid" className="details-info-icon" />
                    <div>{avgHumid.toFixed(1)} %</div>
                </div>
                <div className="details-info-row">
                    <img src={windIcon} alt="wind" className="details-info-icon" />
                    <div>{avgWinds.toFixed(1)} {windUnit}</div>
                </div>
                {hasRainsData &&
                    <div className="details-info-row">
                        <img src={rainIcon} alt="rain" className="details-info-icon" />
                        <div>{avgRains.toFixed(2)} mm</div>
                    </div>
                }
                {hasSnowsData &&
                    <div className="details-info-row">
                        <img src={snowIcon} alt="snow" className="details-info-icon" />
                        <div>{avgSnow.toFixed(2)} mm</div>
                    </div>
                }
                {!hasRainsData && !hasSnowsData &&
                    <div className="details-info-row">No precipitation</div>
                }
            </div>
        </div>
    );
};

export default Card;