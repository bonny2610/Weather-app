export function tempRating(temp) {
    if (temp < 0 && temp >= -265) {
        return { text: "Very cold", className: "temp-very-cold" };
    } else if (temp > 0 && temp <= 10) {
        return { text: "Cold", className: "temp-cold" };
    } else if (temp > 10 && temp <= 20) {
        return { text: "Quite cool", className: "temp-quite-cool" };
    } else if (temp > 20 && temp <= 30) {
        return { text: "Look fine!", className: "temp-fine" };
    } else if (temp > 30 && temp <= 35) {
        return { text: "Quite hot!", className: "temp-quite-hot" };
    } else if (temp > 35) {
        return { text: "Extremely hot", className: "temp-extremely-hot" };
    } else {
        return { text: "Unknown", className: "temp-unknown" };
    }
}
