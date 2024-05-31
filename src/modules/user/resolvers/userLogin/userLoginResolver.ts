import {DTO, Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
import {userLoginInputFields, userLoginOutputFields} from './userLoginFields';

export class UserLoginResolver extends Resolver<typeof userLoginInputFields, typeof userLoginOutputFields> {
    constructor() {
        super('userLogin', 'mutation', userLoginInputFields, userLoginOutputFields);
    }

    async resolverFn(_: null, input: DTO<typeof userLoginInputFields>, context: Context) {
        console.log(input);
        console.log(context);

        return {
            token: '',
        };
    }
}
