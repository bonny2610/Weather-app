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
        // Thunderstorm group (2xx)
        "Thunderstorm": "thunderstorm-background",

        // Drizzle group (3xx)
        "Drizzle": "drizzle-background",

        // Rain group (5xx)
        "Rain": "rain-background",

        // Snow group (6xx)
        "Snow": "snow-background",

        // Atmosphere group (7xx)
        "Mist":    "atmosphere-background",
        "Smoke":   "atmosphere-background",
        "Haze":    "atmosphere-background",
        "Dust":    "atmosphere-background",
        "Fog":     "atmosphere-background",
        "Sand":    "atmosphere-background",
        "Ash":     "atmosphere-background",
        "Squall":  "atmosphere-background",
        "Tornado": "atmosphere-background",

        // Clear group (800)
        "Clear": "clear-background",

        // Clouds group (80x)
        "Clouds": "clouds-background",
    };

    // Fall back to sunny-background if condition is unrecognized
    return weatherClassMap[condition] || "sunny-background";
}