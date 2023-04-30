class AppError {
    messege;
    statusCode;

    constructor(messege, statusCode = 400){
        this.messege = messege;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;