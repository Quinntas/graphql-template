import {MySqlTable} from 'drizzle-orm/mysql-core';
import {userTable} from '../../user/infra/database/userTable';

export const tables = new Map<string, MySqlTable>([['User', userTable]]);
