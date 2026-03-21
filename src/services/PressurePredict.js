export function pressureLevel(pressure) {
    if (pressure < 980) {
        return {
            level: "Very Low",
            message: "Possible storms, unstable weather.",
            className: "very-low-pressure"
        };
    }
    else if (pressure < 1000) {
        return {
            level: "Low",
            message: "Rainy or stormy weather likely.",
            className: "low-pressure"
        };
    }
    else if (pressure < 1015) {
        return {
            level: "Normal",
            message: "Stable and mild weather.",
            className: "normal-pressure"
        };
    }
    else if (pressure < 1030) {
        return {
            level: "High",
            message: "Clear and dry weather.",
            className: "high-pressure"
        };
    }
    else {
        return {
            level: "Very High",
            message: "Dry air, may cause discomfort.",
            className: "very-high-pressure"
        };
    }
}