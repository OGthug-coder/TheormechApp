function NoHistoryFoundException(message) {
    this.message = message;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, NoHistoryFoundException);
    else
        this.stack = (new Error()).stack;
};

export default NoHistoryFoundException;