import {IncomingMessage, ServerResponse} from 'http';
import {HttpError, internalServerError, notFound} from './errors';
import {jsonResponse} from './responses';
import {schema} from '../infra/graphql/schema';
import {compileQuery} from 'graphql-jit';
import {parse} from 'graphql';

let cache = {};

export function handleError(res: ServerResponse, error: Error) {
    switch (true) {
        case error instanceof HttpError:
            return jsonResponse(res, error.status, {
                message: error.message,
                ...error.data,
            });

        default:
            console.error(error.message);
            return handleError(res, internalServerError);
    }
}

async function handleQuery(payload: string, res: ServerResponse) {
    if (payload.length === 0) throw new HttpError(400, 'no query provided');
    const {query} = JSON.parse(payload);
    (cache as any)[query] = (cache as any)[query] || compileQuery(schema, parse(query));
    const result = await (cache as any)[query].query();
    return jsonResponse(res, 200, result);
}

function checkForValidEndpoint(url: string | undefined, endpoint: string) {
    if (!url) throw notFound;
    if (url != endpoint) throw notFound;
}

export function httpHandler(req: IncomingMessage, res: ServerResponse) {
    let payload = '';

    req.on('data', (chunk: Buffer) => {
        payload += chunk.toString();
    });

    req.on('end', async () => {
        try {
            checkForValidEndpoint(req.url, '/graphql');
            return await handleQuery(payload, res);
        } catch (e: any) {
            return handleError(res, e);
        }
    });
}
