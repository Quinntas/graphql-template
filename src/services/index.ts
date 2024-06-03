import {env} from '../utils/env';
import {RedisService} from './redis/redisClient';

const redisService = new RedisService(env.REDIS_URL);

export {redisService};
