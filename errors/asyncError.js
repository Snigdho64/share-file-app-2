const APIError = require('./error')

const asyncError = (asyncFunction) => async (req, res, next) => {
    try {
        await asyncFunction(req, res, next)
    } catch (err) {
        if (err instanceof APIError) {
            return next(err)
        }
        next(new APIError(err.httpCode, err.message))
    }
}
module.exports = asyncError
