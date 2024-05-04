require('dotenv').config();

import {drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './tables';

export const db = drizzle(
    mysql.createPool({
        uri: process.env.DATABASE_URL,
    }),
    {
        schema,
        mode: 'default',
    },
);
