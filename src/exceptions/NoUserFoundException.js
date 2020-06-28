function NoUserFoundException(message) {
    this.message = message;
    if ("captureStackTrace" in Error)
        Error.captureStackTrace(this, NoUserFoundException);
    else
        this.stack = (new Error()).stack;
}

export default NoUserFoundException;