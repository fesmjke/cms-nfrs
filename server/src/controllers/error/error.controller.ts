export class ErrorController {
    
    public errorClassifier = (err,reply) => {
        if(err.code && err.code == 11000){
            this.handleDuplicateKeyError(err,reply)
        }
    }

    public handleDuplicateKeyError = (err,reply) => {
        const field = Object.keys(err.keyValue);
        const code = 409;
        const error = `An account with that ${field} already exists.`;
        reply.status(code).send({messages: error, fields: field});
    }
}