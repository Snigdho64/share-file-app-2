const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
}

class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name || Error.name
        this.httpCode = httpCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}

//free to extend the BaseError
class APIError extends BaseError {
    constructor(
        httpCode = HttpStatusCode.INTERNAL_SERVER,
        description = 'internal server error',
        isOperational = true,
        name
    ) {
        super(name, httpCode, description, isOperational)
        BaseError.captureStackTrace(this)
    }
}

module.exports = APIError
