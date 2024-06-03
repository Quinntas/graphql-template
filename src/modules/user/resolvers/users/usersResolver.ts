import {DTO, Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
import {usersInputFields, usersOutputFields} from "./usersFields";

export class UsersResolver extends Resolver<typeof usersInputFields, typeof usersOutputFields> {
    constructor() {
        super({
            name: 'users',
            description: 'Get a batch of users',
            route: 'query',
            fields: {
                input: usersInputFields,
                output: usersOutputFields,
            },
        });
    }

    async resolverFn(_: null, input: DTO<typeof usersInputFields>, context: Context): Promise<DTO<typeof usersOutputFields>> {
        console.log(input);
        console.log(context);

        return {
            data: null,
        };
    }
}
