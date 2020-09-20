// 21-07-2020 00:00:00
export const toCustomFormat = (date) => {
    return date.getDate()     + "-"
        + date.getMonth()    + "-"
        + date.getFullYear() + " "
        + date.getHours()    + ":"
        + date.getMinutes()  + ":"
        + date.getSeconds();
};

export const toDefaultFormat = (date) => {
    const dateTime = date.split(" ");
    date = dateTime[0].split('-');
    let time = dateTime[1].split(":");
    return new Date(parseInt(date[2]), parseInt(date[1]), parseInt(date[0]),
        parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));
};

