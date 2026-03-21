
import { useContext, useRef, useEffect } from "react";
import "../../assets/styles/ForecastContainer.css";
import { dragAndHold } from "../../services/DragAndHold";
import { getDataByDay } from "../../services/GatherWeatherInfo";
import { WeatherContext } from "../context/WeatherContext";
import Card from "./Card";
import ForecastDayDetails from "./ForecastDayDetails";
import icon from '../../assets/icons/calendar_day_month_date_year_schedule_icon_175594.png';

export const ForecastContainer = ({ weatherArr, timezone, unit, windUnit }) => {
    const getWeatherbyDay = getDataByDay(weatherArr, timezone);
    const sliderRef = useRef(null);
    const { selectedDay, setSelectedDay } = useContext(WeatherContext);

    useEffect(() => {
        if (sliderRef.current) {
            dragAndHold(sliderRef.current);
        }
    }, []);

    return (
        <div className='forecast-container'>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1vh',
                paddingTop: '2vh'
            }}>
                <img src={icon} alt="forecast icon" style={{ height: '3vh' }} />
                <h3 style={{ margin: 0 }}>Forecast next 5 days</h3>
            </div>
            <div className='slide-show' ref={sliderRef}>
                <div className="weather-cards">
                    {getWeatherbyDay.map((item, index) =>
                        <Card
                            key={index}
                            date={item.date}
                            icon={item.icons[item.icons.length - 1]}
                            temps={item.temperatures}
                            unit={unit}
                            humidities={item.humidities}
                            winds={item.winds}
                            rains={item.rains}
                            snows={item.snows}
                            times={item.times}
                            windUnit={windUnit}
                        />
                    )}
                </div>
            </div>

            {selectedDay && (
                <ForecastDayDetails selectedDay={selectedDay} setSelectedDay={setSelectedDay} unit={unit} windUnit={windUnit}></ForecastDayDetails>
            )}
        </div>
    );
};
