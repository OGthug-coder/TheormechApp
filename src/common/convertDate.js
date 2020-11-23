import InvalidDateFormatException from "./exceptions/InvalidException";

export const toMillis = (date) => {
    if (isNaN(date.getTime())) {
        throw new InvalidDateFormatException();
    }

    return date.getTime();
};

export const toDefaultFormat = (date) => {
    return new Date(date);
};

