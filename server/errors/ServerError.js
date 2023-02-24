import BaseError from "./BaseError.js";

export default class ServerError extends BaseError {
    constructor(message = 'OOPS, Something went wrong!', code = 500) {
        super(message, code);
    }
}