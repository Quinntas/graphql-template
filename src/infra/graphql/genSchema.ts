import {createWriteStream} from 'fs';
import {printSchema} from 'graphql';
import {schema} from './schema';

function genSchema() {
    console.log('Generating schema');

    const f = createWriteStream('./schema.graphql');
    f.write(printSchema(schema));

    console.log('Schema generated');
}

genSchema();
