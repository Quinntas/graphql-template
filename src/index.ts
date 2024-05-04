import {parse} from 'graphql';
import {compileQuery} from 'graphql-jit';
import {createServer} from 'http';
import {schema} from './gql';

const cache = {};

const server = createServer((req, res) => {
    let payload = '';

    req.on('data', (chunk) => {
        payload += chunk.toString();
    });

    req.on('end', async () => {
        if (req.url !== '/graphql') {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    message: 'not found',
                }),
            );
        }

        if (payload.length === 0) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    message: 'no query',
                }),
            );
        }

        try {
            const {query} = JSON.parse(payload);

            // @ts-ignore
            cache[query] = cache[query] || compileQuery(schema, parse(query));

            // @ts-ignore
            const result = await cache[query].query();

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        } catch (e) {
            console.error(e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    message: 'internal server error',
                }),
            );
        }
    });
});

console.log('Running on: http://localhost:4001');
server.listen(4001);
