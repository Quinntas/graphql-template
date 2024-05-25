import {createServer} from 'http';
import {httpHandler} from '../../core/handler';
import {env} from '../../utils/env';

const server = createServer(httpHandler);
console.log(`Running on: http://localhost:${env.PORT}`);
server.listen(env.PORT);
