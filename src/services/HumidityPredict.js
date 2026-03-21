export function humidityPredict(condition) {
    if (condition < 30) {
        return { level: "Very Dry", message: "Dry skin, chapped lips, breathing discomfort.", className: "very-dry" };
    } else if (condition < 40) {
        return { level: "Dry", message: "Slight discomfort, possible dry skin & throat.", className: "dry" };
    } else if (condition < 50) {
        return { level: "Relatively Good", message: "Comfortable for health.", className: "relatively-good" };
    } else if (condition < 60) {
        return { level: "Ideal", message: "Balanced for health & indoors.", className: "ideal" };
    } else if (condition < 70) {
        return { level: "Slightly Humid", message: "Mild discomfort, mold may grow.", className: "slightly-humid" };
    } else if (condition < 80) {
        return { level: "High Humidity", message: "Heavy air, risk of mold & allergies.", className: "high-humidity" };
    } else {
        return { level: "Very Humid", message: "Mold & bacteria thrive, health risk.", className: "very-humid" };
    }
}
