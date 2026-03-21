/* eslint-disable react/prop-types */

import humidIcon from "../../assets/icons/icons8-humidity-50.png";
import windIcon from "../../assets/icons/icons8-wind-50.png";
import visibilityIcon from "../../assets/icons/icons8-visibility-50.png";
import pressureIcon from "../../assets/icons/icons8-pressure-50.png";
import feelLikeIcon from "../../assets/icons/icons8-temperature-50.png";
import snowIcon from "../../assets/icons/icons8-snow-50.png";
import rainIcon from "../../assets/icons/icons8-rain-50.png";

import "../../assets/styles/CurrentWeatherContainer.css";
import "../../assets/styles/CurrentWeather.css";

import { humidityPredict } from "../../services/HumidityPredict";
import { windDirect } from "../../services/WindPredict";
import { pressureLevel } from "../../services/PressurePredict";
import { VisibilityLevel } from "../../services/VisibilityPredict";
import { tempRating } from "../../services/TempRating";
import { rainLevel, snowLevel } from "../../services/PrecipitationPredict";

/**
 * CurrentWeatherContainer — displays all current weather parameters for a city.
 *
 * @param {string}  unit            - Temperature unit label (°C / °F / K)
 * @param {string}  windUnit        - Wind speed unit label (m/s / mph)
 * @param {number}  currentTemp     - Current temperature
 * @param {string}  mainDescription - Main weather condition (e.g. "Rain", "Clear")
 * @param {string}  description     - Detailed weather description
 * @param {string}  icon            - OpenWeatherMap icon code
 * @param {number}  humidity        - Humidity percentage
 * @param {number}  wind            - Wind speed
 * @param {number}  visibility      - Visibility in meters
 * @param {number}  pressure        - Atmospheric pressure in hPa
 * @param {string}  address         - City name
 * @param {number}  feelLike        - Feels-like temperature
 * @param {number}  windDeg         - Wind direction in degrees
 * @param {number}  rain            - Rainfall in last 1h (mm), 0 if none
 * @param {number}  snow            - Snowfall in last 1h (mm), 0 if none
 */
export const CurrentWeatherContainer = ({
    unit,
    currentTemp,
    mainDescription,
    icon,
    description,
    humidity,
    wind,
    visibility,
    pressure,
    address,
    feelLike,
    windDeg,
    rain,
    snow,
    windUnit,
}) => {
    // Build icon URL from OpenWeatherMap icon code (@2x for higher resolution)
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    // Derive descriptive labels and CSS classes from raw weather values
    const humidityInfo  = humidityPredict(humidity);
    const windDirection = windDirect(windDeg);
    const pressureInfo  = pressureLevel(pressure);
    const visibilityInfo = VisibilityLevel(visibility);
    const tempInfo      = tempRating(feelLike);

    // Precipitation info — only computed when rain/snow is present
    const rainInfo = rain ? rainLevel(rain) : null;
    const snowInfo = snow ? snowLevel(snow) : null;

    return (
        <div>
            {/* ── City overview: name, icon, temperature, condition ── */}
            <div className="weather-overview">
                <h1>{address}</h1>
                <img src={iconUrl} alt="weather icon" />
                <p className="temperature">
                    {currentTemp} {unit}
                </p>
                <h3 className="description">{mainDescription}</h3>
                <div className="sub-description">{description}</div>
            </div>

            {/* ── Detailed weather parameters grid ── */}
            <div className="current-weather">

                {/* Feels like */}
                <div className="small-container">
                    <div className="header-container">
                        <img src={feelLikeIcon} alt="feels like" className="icon-picture" />
                        <p>Feels like</p>
                    </div>
                    <p className="weather-value">{feelLike} {unit}</p>
                    <p className={`weather-status ${tempInfo.className}`}>{tempInfo.text}</p>
                </div>

                {/* Precipitation — shows rain, snow, or "nothing" */}
                <div className="small-container">
                    {rain ? (
                        <>
                            <div className="header-container">
                                <img src={rainIcon} alt="rain" className="icon-picture" />
                                <p>Rain</p>
                            </div>
                            <p className="weather-value">{rain} mm</p>
                            <p className={`weather-status ${rainInfo.className}`}>{rainInfo.level}</p>
                        </>
                    ) : snow ? (
                        <>
                            <div className="header-container">
                                <img src={snowIcon} alt="snow" className="icon-picture" />
                                <p>Snow</p>
                            </div>
                            <p className="weather-value">{snow} mm</p>
                            <p className={`weather-status ${snowInfo.className}`}>{snowInfo.level}</p>
                        </>
                    ) : (
                        <>
                            <div className="header-container">
                                <img src={rainIcon} alt="rain" className="icon-picture" />
                                <span>/</span>
                                <img src={snowIcon} alt="snow" className="icon-picture" />
                            </div>
                            <p className="weather-value">0 mm</p>
                            <p className="weather-status"><i>Nothing to show now...</i></p>
                        </>
                    )}
                </div>

                {/* Humidity */}
                <div className="small-container">
                    <div className="header-container">
                        <img src={humidIcon} alt="humidity" className="icon-picture" />
                        <p>Humidity</p>
                    </div>
                    <p className="weather-value">{humidity} %</p>
                    <p className={`weather-status ${humidityInfo.className}`}>{humidityInfo.level}</p>
                </div>

                {/* Wind speed and direction */}
                <div className="small-container">
                    <div className="header-container">
                        <img src={windIcon} alt="wind" className="icon-picture" />
                        <p>Wind</p>
                    </div>
                    <p className="weather-value">{wind} {windUnit}</p>
                    <p className="weather-status">{windDirection}</p>
                </div>

                {/* Atmospheric pressure */}
                <div className="small-container">
                    <div className="header-container">
                        <img src={pressureIcon} alt="pressure" className="icon-picture" />
                        <p>Pressure</p>
                    </div>
                    <p className="weather-value">{pressure} hPa</p>
                    <p className={`weather-status ${pressureInfo.className}`}>{pressureInfo.level}</p>
                </div>

                {/* Visibility (converted from meters to km) */}
                <div className="small-container">
                    <div className="header-container">
                        <img src={visibilityIcon} alt="visibility" className="icon-picture" />
                        <p>Visibility</p>
                    </div>
                    <p className="weather-value">{visibility / 1000} km</p>
                    <p className={`weather-status ${visibilityInfo.className}`}>{visibilityInfo.level}</p>
                </div>

            </div>
        </div>
    );
};