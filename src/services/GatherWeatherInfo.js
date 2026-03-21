import { TimeConverter } from "../utils/TimeConverter";

export function getDataByDay(arr, timezone) {

    const dailyData = new Map();
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    arr.forEach(item => {
        const date = weekday[new Date(TimeConverter(item.dt, timezone)).getDay()] + " " + TimeConverter(item.dt, timezone).substring(8, 10);
        const time = TimeConverter(item.dt, timezone).substring(11).substring(0, 5);
        const temp = item.main.temp;
        const icon = item.weather[0].icon;
        const humidity = item.main.humidity;
        const wind = item.wind.speed;
        const rain = item.rain ? item.rain["3h"] : 0;
        const snow = item.snow ? item.snow["3h"] : 0;

        if (!dailyData.has(date)) {
            dailyData.set(date, {
                date: date,
                times: [time],
                temperatures: [temp],
                icons: [icon],
                humidities: [humidity],
                winds: [wind],
                rains: [rain],
                snows: [snow]
            });
        } else {
            dailyData.get(date).times.push(time);
            dailyData.get(date).temperatures.push(temp);
            dailyData.get(date).icons.push(icon);
            dailyData.get(date).humidities.push(humidity);
            dailyData.get(date).winds.push(wind);
            dailyData.get(date).rains.push(rain);
            dailyData.get(date).snows.push(snow);
        }
    });
    const listByDay = Array.from(dailyData.values());

    return listByDay;
}
