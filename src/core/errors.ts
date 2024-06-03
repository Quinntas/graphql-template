export class HttpError extends Error {
    public status: number;
    public data: object | undefined;

    constructor(status: number, message: string, data?: object) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

export const notFound = new HttpError(404, 'not found');
export const internalServerError = new HttpError(500, 'internal server error');

export class InternalServerError extends HttpError {
    constructor(message: string, data?: object) {
        super(500, message, data);
    }
}
