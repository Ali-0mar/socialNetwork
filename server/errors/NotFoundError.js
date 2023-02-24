import BaseError from "./BaseError.js";

export default class NotFoundError extends BaseError {
    constructor(entity, message = 'Not Found', code = 404) {
        super(message, code);
        this.entity = entity;
        this.message = `${this.entity} ${this.message}`;
    }
}