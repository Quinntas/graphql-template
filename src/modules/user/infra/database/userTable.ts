import {datetime, int, mysqlTable, varchar} from 'drizzle-orm/mysql-core';
import {v4} from 'uuid';
import {UserRolesEnum} from '../../domain/user';

export const userTable = mysqlTable('Users', {
    id: int('id').primaryKey().autoincrement(),
    pid: varchar('pid', {length: 191}).unique().notNull().default(v4()),
    email: varchar('email', {length: 191}).unique().notNull(),
    password: varchar('password', {length: 191}).notNull(),
    phone: varchar('phone', {length: 191}).unique().notNull(),
    role: varchar('role', {length: 191}).notNull().default(UserRolesEnum.CLIENT),
    createdAt: datetime('createdAt').notNull(),
    updatedAt: datetime('updatedAt').notNull(),
});
