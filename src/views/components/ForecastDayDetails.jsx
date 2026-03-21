
import "../../assets/styles/ForecastContainer.css";
import SpecificChart from "./SpecificChart";

const ForecastDayDetails = ({ selectedDay, setSelectedDay, unit, windUnit }) => {
    const hasRainsData = selectedDay.rains && selectedDay.rains.some(value => value > 0);
    const hasSnowsData = selectedDay.snows && selectedDay.snows.some(value => value > 0);
    const hasWindsData = selectedDay.winds && selectedDay.winds.some(value => value > 0);

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{selectedDay.date}</h2>
                    <button className="close-button" onClick={() => setSelectedDay(null)}>✖</button>
                </div>
                <div className="chart-section">
                    <h3>Temperature Variation</h3>
                    <SpecificChart
                        horizontalVars={selectedDay.temps}
                        verticalVars={selectedDay.times}
                        typeChart={"Line"}
                        name={"Temperature"}
                        color={"rgba(255, 99, 132, 0.5)"}
                        borderColor={"rgb(255, 99, 132)"}
                        unit={unit}
                    />
                </div>

                {hasRainsData && (
                    <div className="chart-section">
                        <h3>Rain Forecast</h3>
                        <SpecificChart
                            horizontalVars={selectedDay.rains}
                            verticalVars={selectedDay.times}
                            typeChart={"Chart"}
                            name={"Rain"}
                            color={"rgba(53, 162, 235, 0.5)"}
                            borderColor={"rgb(53, 162, 235)"}
                            unit={"mm"}
                        />
                    </div>
                )}

                {hasSnowsData && (
                    <div className="chart-section">
                        <h3>Snow Forecast</h3>
                        <SpecificChart
                            horizontalVars={selectedDay.snows}
                            verticalVars={selectedDay.times}
                            typeChart={"Chart"}
                            name={"Snow"}
                            color={"rgba(135, 206, 235, 0.5)"}
                            borderColor={"rgb(135, 206, 235)"}
                            unit={"mm"}
                        />
                    </div>
                )}

                {hasWindsData && (
                    <div className="chart-section">
                        <h3>Wind Forecast</h3>
                        <SpecificChart
                            horizontalVars={selectedDay.winds}
                            verticalVars={selectedDay.times}
                            typeChart={"HorizontalBar"}
                            name={"Wind"}
                            color={"rgba(50, 205, 50, 0.5)"}
                            borderColor={"rgb(50, 205, 50)"}
                            unit={windUnit}
                        />
                    </div>
                )}

                {!hasRainsData && !hasSnowsData && !hasWindsData && (
                    <div className="no-data-message">No precipitation or wind data available now</div>
                )}
            </div>
        </div>
    );
};

export default ForecastDayDetails;
