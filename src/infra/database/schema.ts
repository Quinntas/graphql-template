import {boolean, datetime, int, mysqlEnum, mysqlTable, varchar} from 'drizzle-orm/mysql-core';
import {relations} from 'drizzle-orm';

export const dealersTable = mysqlTable('Dealers', {
    id: int('id').primaryKey(),
    pid: varchar('pid', {length: 191}).unique().notNull(),
    firstName: varchar('firstName', {length: 191}).notNull(),
    lastName: varchar('lastName', {length: 191}).notNull(),
    dealerHasExperience: boolean('dealerHasExperience').notNull(),
    cpf: varchar('cpf', {length: 191}).notNull(),
    rg: varchar('rg', {length: 191}).notNull(),
    brand: varchar('brand', {length: 191}).notNull(),
    gender: mysqlEnum('gender', ['M', 'F']).notNull(),
    registerStatus: mysqlEnum('registerStatus', [
        'ON_GENDER_QUESTION',
        'ON_EXPERIENCE_QUESTION',
        'ON_ANTI_FRAUD',
        'ON_QUIZ',
        'ON_DOCUMENT_BIOMETRY',
        'ON_FACE_BIOMETRY',
        'ON_BIRO',
        'FINISHED',
        'REJECTED',
    ]).notNull(),
    rejectionReason: mysqlEnum('rejectionReason', [
        'REJECTED_BY_ANTIFRAUD',
        'REJECTED_BY_FACE_BIOMETRY',
        'REJECTED_BY_BIRO',
        'REJECTED_BY_GENDER_QUESTION',
        'REJECTED_BY_EXPERIENCE_QUESTION',
        'REJECTED_BY_AGE',
    ]).notNull(),
    antiFraudStatus: mysqlEnum('antiFraudStatus', ['APPROVED', 'REJECTED', 'PROCESS']).notNull(),
    faceBiometryStatus: mysqlEnum('faceBiometryStatus', ['APPROVED', 'REJECTED']).notNull(),
    creditAnalysisPid: varchar('creditAnalysisPid', {length: 191}).notNull(),
    walletId: varchar('walletId', {length: 191}).notNull(),
    userId: int('userId').notNull(),
    storeRefCode: varchar('storeRefCode', {length: 191}).notNull(),
    revScore: int('revScore').notNull(),
    created_at: datetime('created_at').notNull(),
    updated_at: datetime('updated_at').notNull(),
});

export const dealerRelations = relations(dealersTable, ({one}) => ({
    User: one(usersTable, {fields: [dealersTable.userId], references: [usersTable.id]}),
}));

export const usersTable = mysqlTable('Users', {
    id: int('id').primaryKey(),
    pid: varchar('pid', {length: 191}).unique().notNull(),
    email: varchar('pid', {length: 191}).unique().notNull(),
    password: varchar('pid', {length: 191}).notNull(),
    phone: varchar('pid', {length: 191}).notNull(),
    created_at: datetime('created_at').notNull(),
    updated_at: datetime('updated_at').notNull(),
});
