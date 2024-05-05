import {Resolver} from '../../../../core/resolver';
import {Context} from '../../../shared/domain/context';
import {LoginInput, LoginOutput, loginInputFields, loginOutputFields} from './loginDTO';

export class LoginResolver extends Resolver<LoginInput, LoginOutput> {
    constructor() {
        super('login', loginInputFields, loginOutputFields);
    }

    async resolverFn(root: null, input: LoginInput, context: Context): Promise<LoginOutput> {
        return {
            token: '',
        };
    }
}
