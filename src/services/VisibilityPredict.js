export function VisibilityLevel(visibility) {
    const km = visibility / 1000;

    if (km >= 10) {
        return { level: "Clear", className: "status-good" };
    } else if (km >= 5) {
        return { level: "Moderate", className: "status-moderate" };
    } else if (km >= 2) {
        return { level: "Poor", className: "status-warning" };
    } else {
        return { level: "Very Poor", className: "status-bad" };
    }
}