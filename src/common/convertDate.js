import InvalidDateFormatException from "./exceptions/InvalidException";

export const toCustomFormat = (date) => {
    if (isNaN(date.getTime())) {
        throw new InvalidDateFormatException();
    }

    return toDoubleDigits(date.getDate()) + "-"
        + toDoubleDigits(parseInt(date.getMonth()) + 1) + "-"
        + toDoubleDigits(date.getFullYear()) + " "
        + toDoubleDigits(date.getHours()) + ":"
        + toDoubleDigits(date.getMinutes()) + ":"
        + toDoubleDigits(date.getSeconds());
};

const toDoubleDigits = (number) => {
    // make double digits month
    number = number.toString();
    if (number.length === 1) {
        number = "0" + number;
    }
    return number;
};

export const toDefaultFormat = (date) => {
    return new Date(date);
};

