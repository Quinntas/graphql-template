import {SQL} from 'drizzle-orm';
import {MySqlDialect} from 'drizzle-orm/mysql-core';

export namespace DBUtils {
    export function logQuery(q: SQL) {
        let dialect = new MySqlDialect();
        console.log(dialect.sqlToQuery(q));
    }
}
