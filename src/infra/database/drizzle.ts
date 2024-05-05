import {drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import {env} from '../../utils/env';

export const db = drizzle(
    mysql.createPool({
        uri: env.DATABASE_URL,
    }),
    {
        schema,
        mode: 'default',
    },
);
