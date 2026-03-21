import moment from "moment";

export const TimeConverter = (unixTime, timezoneOffset) => {
    const calculatedDate = unixTime + timezoneOffset;
    const date = moment.unix(calculatedDate).utc();
    return date.format("YYYY-MM-DD HH:mm:ss");
}