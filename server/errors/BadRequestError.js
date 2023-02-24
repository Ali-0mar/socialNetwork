import BaseError from "./BaseError.js";
export default class BadRequest extends BaseError {
    constructor(params,message = 'Bad Request, Missing: ', code = 400) {
        super(message, code);
        this.params = params;
        //TODO find a better syntax
        this.message += this.params;
    }
}