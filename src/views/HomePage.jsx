import 'bootstrap/dist/css/bootstrap.css';
import "../assets/styles/CurrentWeatherContainer.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './components/Header';
import { CurrentWeatherContainer } from './components/CurrentWeatherContainer';
import { ForecastContainer } from './components/ForecastContainer';
import { ForecastChart } from './components/ForecastChart';
import { changeBackground } from '../services/SetBackground';
import { DayDetails } from './components/DayDetails';
import LocationContainer from './components/LocationContainter';
import "../assets/styles/HomePage.css";
import Map from './components/Map';
import { useError } from './context/ErrorContext';
import ErrorPopup from './components/ErrorPopup';
import { WelcomeScreen } from './components/WelcomeScreen';

export const HomePage = () => {
    // ── Weather data state ──────────────────────────────────────────────
    const [data, setData] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({ lat: '', lon: '' });
    const [unit, setUnit] = useState('K');
    const [windUnit, setWindUnit] = useState("m/s");
    const [recentSearches, setRecentSearches] = useState([]);
    const [metrics, setMetrics] = useState('metric');
    const [name, setName] = useState("");
    const [detailsName, setDetailsName] = useState("");
    const [bg, setBg] = useState("sunny-background");

    // ── UI state ────────────────────────────────────────────────────────
    const [showHome, setShowHome] = useState(true);   // show welcome screen by default
    const [loading, setLoading] = useState(false);     // loading spinner flag

    const { setError } = useError();

    // ── API endpoints ───────────────────────────────────────────────────
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const getLocation = `https://nominatim.openstreetmap.org/search.php?q=${address}&format=jsonv2&accept-language=en`;
    const getCurrentWeatherByLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&lang=en&appid=${API_KEY}&units=${metrics}`;
    const getForecastWeatherByLocation = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${metrics}`;

    /**
     * Fetches coordinates for the entered city name using Nominatim geocoding API.
     * Updates location state, which triggers the weather data fetch via useEffect.
     */
    const fetchLocation = async () => {
        if (address !== "") {
            try {
                const responseLocation = await axios.get(getLocation);
                const dataLocation = responseLocation.data;

                if (dataLocation.length === 0) {
                    setError("City not found");
                    setShowHome(true);  // ← quay về trang chủ nếu không tìm thấy
                    setLoading(false);
                    return;
                }

                setLocation({ lat: dataLocation[0].lat, lon: dataLocation[0].lon });
                setName(dataLocation[0].name);
                setDetailsName(dataLocation[0].display_name);
            } catch (error) {
                setError(error.message);
                setShowHome(true);  // ← quay về trang chủ nếu API lỗi
                setLoading(false);
            }
        }
    };

    /**
     * Fetches current weather and 5-day forecast from OpenWeatherMap API.
     * Triggered whenever location or metrics unit changes.
     */
    useEffect(() => {
        const fetchData = async () => {
            if (location.lat === '' || location.lon === '') return;

            // Set measurement units based on selected metrics system
            if (metrics === 'metric') {
                setUnit('°C');
                setWindUnit('m/s');
            } else if (metrics === 'imperial') {
                setUnit('°F');
                setWindUnit('mph');
            } else {
                setUnit('K');
                setWindUnit('m/s');
            }

            try {
                // Fetch current weather and forecast concurrently for performance
                const [responseCurrent, responseForecast] = await Promise.all([
                    axios.get(getCurrentWeatherByLocation),
                    axios.get(getForecastWeatherByLocation),
                ]);

                setData(responseCurrent.data);
                setForecast(responseForecast.data);

                // Update dynamic background based on weather condition
                if (responseCurrent.data?.weather?.length > 0) {
                    const newBg = changeBackground(responseCurrent.data.weather[0].main);
                    setBg(newBg);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError("City not found");
                } else {
                    setError(error.message);
                }
            } finally {
                // Always stop loading spinner after fetch completes
                setLoading(false);
            }
        };

        fetchData();
    }, [location, location.lat, location.lon, metrics]);

    /**
     * Handles search form submission.
     * Shows loading spinner, hides welcome screen, and triggers location fetch.
     */
    const handleSearch = () => {
        setShowHome(false);
        setLoading(true);
        fetchLocation();
        setRecentSearches([...recentSearches, address]);
    };

    /**
     * Resets the view to the welcome screen without clearing fetched data.
     * Data is preserved so re-navigating back shows results immediately.
     */
    const handleReset = () => {
        setShowHome(true);
    };

    // ── Weather tips (random on each load) ─────────────────────────────
    const weatherTips = [
        "Did you know? The highest temperature ever recorded on Earth was 56.7°C (134°F) in Death Valley, California, USA.",
        "Did you know? The coldest temperature ever recorded on Earth was -89.2°C (-128.6°F) at Vostok Station in Antarctica.",
        "Did you know? The wettest place on Earth is Mawsynram, India, with an average annual rainfall of 467.4 inches.",
        "Did you know? The driest place on Earth is the Atacama Desert in Chile, where some weather stations have never recorded rain.",
        "Did you know? A single lightning bolt can heat the air around it to temperatures five times hotter than the sun's surface.",
    ];
    const randomTip = weatherTips[Math.floor(Math.random() * weatherTips.length)];

    return (
        <main
            id="background"
            className={data && forecast && !showHome ? bg : ""}
            style={data && forecast && !showHome ? {} : { background: 'transparent' }}
        >
            <ErrorPopup />

            <Header
                setAddress={setAddress}
                setMetrics={setMetrics}
                setUnit={setUnit}
                fetchData={handleSearch}
                metrics={metrics}
                recentSearches={recentSearches}
                bg={bg}
                hasData={!!(data && forecast && !showHome)}
                onReset={handleReset}
            />

            {/* ── Loading spinner ── */}
            {loading && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        border: '4px solid rgba(255,255,255,0.2)',
                        borderTop: '4px solid #fff',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', letterSpacing: '0.1em' }}>
                        Fetching weather data...
                    </p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* ── Main content ── */}
            {!loading && (
                data && forecast && location && name && !showHome ? (
                    <>
                        <CurrentWeatherContainer
                            unit={unit}
                            windUnit={windUnit}
                            currentTemp={data.main.temp.toFixed(1)}
                            mainDescription={data.weather[0].main}
                            description={data.weather[0].description}
                            icon={data.weather[0].icon}
                            maxTemp={data.main.temp_max.toFixed(1)}
                            minTemp={data.main.temp_min.toFixed(1)}
                            humidity={data.main.humidity.toFixed(1)}
                            wind={data.wind.speed.toFixed(1)}
                            rain={data.rain ? data.rain['1h'] : 0}
                            snow={data.snow ? data.snow['1h'] : 0}
                            address={name}
                            visibility={data.visibility}
                            pressure={data.main.pressure}
                            feelLike={data.main.feels_like}
                            max={data.main.temp_max}
                            min={data.main.temp_min}
                            windDeg={data.wind.deg}
                        />

                        <ForecastContainer
                            weatherArr={forecast.list}
                            timezone={data.timezone}
                            unit={unit}
                            windUnit={windUnit}
                        />

                        <hr />

                        <div className="container-2">
                            <ForecastChart
                                weatherArr={forecast.list}
                                unit={unit}
                                timezone={data.timezone}
                            />
                            <Map lat={location.lat} lon={location.lon} />
                        </div>

                        <div className='container-3'>
                            <DayDetails
                                sunrise={data.sys.sunrise}
                                sunset={data.sys.sunset}
                                timezone={data.timezone}
                            />
                            <LocationContainer
                                address={detailsName}
                                lat={location.lat}
                                lon={location.lon}
                                timeUnix={data.dt}
                                timezone={data.timezone}
                            />
                        </div>
                    </>
                ) : (
                    !showHome ? null : (
                        <>
                            <WelcomeScreen randomTip={randomTip} />
                            <div className='container-3' style={{ background: 'transparent' }}>
                                <DayDetails sunrise={""} sunset={""} />
                                <LocationContainer address={""} timeUnix={""} timezone={""} />
                            </div>
                        </>
                    )
                )
            )}
        </main>
    );
};