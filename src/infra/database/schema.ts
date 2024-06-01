import {datetime, int, mysqlTable, varchar} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('Users', {
    id: int('id').primaryKey(),
    pid: varchar('pid', {length: 191}).unique().notNull(),
    email: varchar('pid', {length: 191}).unique().notNull(),
    password: varchar('pid', {length: 191}).notNull(),
    phone: varchar('pid', {length: 191}).notNull(),
    created_at: datetime('created_at').notNull(),
    updated_at: datetime('updated_at').notNull(),
});
