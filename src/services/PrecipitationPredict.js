export function rainLevel(rainfall) {
    if (rainfall < 2.5) {
        return { level: "Light", message: "Light rain, no significant impact.", className: "light-rainfall" };
    } else if (rainfall < 7.6) {
        return { level: "Moderate", message: "Moderate rain, possible minor disruptions.", className: "moderate-rainfall" };
    } else if (rainfall < 50) {
        return { level: "Heavy", message: "Heavy rain, potential for flooding.", className: "heavy-rainfall" };
    } else if (rainfall < 100) {
        return { level: "Very Heavy", message: "Very heavy rain, high risk of flooding.", className: "very-heavy-rainfall" };
    } else {
        return { level: "Extreme", message: "Extreme rain, severe flooding likely.", className: "extreme-rainfall" };
    }
}

export function snowLevel(snowfall) {
    if (snowfall < 2.5) {
        return { level: "Light", message: "Light snow, no significant impact.", className: "light-snowfall" };
    } else if (snowfall < 7.6) {
        return { level: "Moderate", message: "Moderate snow, possible minor disruptions.", className: "moderate-snowfall" };
    } else if (snowfall < 20) {
        return { level: "Heavy", message: "Heavy snow, potential for disruptions.", className: "heavy-snowfall" };
    } else if (snowfall < 50) {
        return { level: "Very Heavy", message: "Very heavy snow, high risk of disruptions.", className: "very-heavy-snowfall" };
    } else {
        return { level: "Extreme", message: "Extreme snow, severe disruptions likely.", className: "extreme-snowfall" };
    }
}