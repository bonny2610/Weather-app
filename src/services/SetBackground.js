/**
 * changeBackground — maps an OpenWeatherMap weather condition string
 * to a corresponding CSS background class name.
 *
 * OpenWeatherMap condition groups:
 *   2xx — Thunderstorm
 *   3xx — Drizzle
 *   5xx — Rain
 *   6xx — Snow
 *   7xx — Atmosphere (Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado)
 *   800 — Clear
 *   80x — Clouds
 *
 * @param {string} condition - The `weather[0].main` value from OWM API response
 * @returns {string} CSS class name to apply to the #background element
 */
export function changeBackground(condition) {
    const weatherClassMap = {
        "Thunderstorm": "thunderstorm-background",
        "Drizzle": "drizzle-background",
        "Rain": "rain-background",
        "Snow": "snow-background",
        "Mist":    "atmosphere-background",
        "Smoke":   "atmosphere-background",
        "Haze":    "atmosphere-background",
        "Dust":    "atmosphere-background",
        "Fog":     "atmosphere-background",
        "Sand":    "atmosphere-background",
        "Ash":     "atmosphere-background",
        "Squall":  "atmosphere-background",
        "Tornado": "atmosphere-background",
        "Clear": "clear-background",
        "Clouds": "clouds-background",
    };
    return weatherClassMap[condition] || "sunny-background";
}