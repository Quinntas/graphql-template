import {parse} from 'graphql';
import {compileQuery, isCompiledQuery} from 'graphql-jit';
import {CompiledQuery} from 'graphql-jit/dist/execution';
import {IncomingMessage, ServerResponse} from 'http';
import {schema} from '../infra/graphql/schema';
import {Context} from '../modules/shared/domain/context';
import {HttpError, internalServerError, notFound} from './errors';
import {jsonResponse} from './responses';

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

interface Cache {
    [key: string]: CompiledQuery<any, any>;
}

let cache: Cache = {};

async function handleQuery(payload: string, req: IncomingMessage, res: ServerResponse) {
    if (payload.length === 0) throw new HttpError(400, 'no query provided');

    const inp = JSON.parse(payload);
    const query = inp.query;

    cache[query] = cache[query] || compileQuery(schema, parse(query));

    if (!isCompiledQuery(cache[query])) throw new HttpError(400, "query couldn't be compiled");

    const result = await cache[query].query(
        {},
        {
            bearer: req.headers.authorization ?? '', // TODO
        } satisfies Context,
        inp.variables,
    );

    return jsonResponse(res, 200, result);
}

function checkForValidEndpoint(url: string | undefined, endpoint: string) {
    if (!url) throw notFound;
    if (url != endpoint) throw notFound;
}

export function httpHandler(req: IncomingMessage, res: ServerResponse) {
    try {
        checkForValidEndpoint(req.url, '/graphql');
    } catch (e: any) {
        return handleError(res, e);
    }

    let payload = '';

    req.on('data', (chunk: Buffer) => {
        payload += chunk.toString();
    });

    req.on('end', async () => {
        try {
            return await handleQuery(payload, req, res);
        } catch (e: any) {
            return handleError(res, e);
        }
    });
}
