import {createServer} from 'http';
import {httphandler} from '../../core/handler';
import {env} from '../../utils/env';

const server = createServer(httphandler);
console.log(`Running on: http://localhost:${env.PORT}`);
server.listen(env.PORT);
