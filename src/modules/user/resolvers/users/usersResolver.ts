import {DTO, Resolver} from '../../../../core/resolver';
import {UserContext} from '../../infra/context/userContext';
import {usersInputFields, usersOutputFields} from './usersFields';

export class UsersResolver extends Resolver<typeof usersInputFields, typeof usersOutputFields> {
    constructor() {
        super({
            name: 'users',
            description: 'List users',
            route: 'query',
            fields: {
                input: usersInputFields,
                output: usersOutputFields,
            },
        });
    }

    async resolverFn(_: null, args: DTO<typeof usersInputFields>, context: UserContext): Promise<DTO<typeof usersOutputFields>> {
        console.log(context);
        console.log(args);

        return {
            data: [],
            pagination: {
                nextOffset: 0,
                hasMore: false,
                total: 0,
            },
        };
    }
}
