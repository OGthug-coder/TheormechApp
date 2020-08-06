class NoUserFoundException extends Error {
    constructor(message) {
        super(message);
    }
}

export default NoUserFoundException;