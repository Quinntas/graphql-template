import {ServerResponse} from 'http';

export function jsonResponse<T extends object>(res: ServerResponse, status: number, data: T) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}
