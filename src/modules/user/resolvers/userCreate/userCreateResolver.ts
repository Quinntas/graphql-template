import {v4} from 'uuid';
import {InternalServerError} from '../../../../core/errors';
import {DTO, Resolver} from '../../../../core/resolver';
import {Encryption} from '../../../../utils/encryption';
import {env} from '../../../../utils/env';
import {UserRolesEnum} from '../../domain/user';
import {validateUserEmail} from '../../domain/valueObjects/userEmail';
import {validateUserPassword} from '../../domain/valueObjects/userPassword';
import {validateUserPhone} from '../../domain/valueObjects/userPhone';
import {userRepo} from '../../repo/userRepo';
import {userCreateInputFields, userCreateOutputFields} from './userCreateFields';

export class UserCreateResolver extends Resolver<typeof userCreateInputFields, typeof userCreateOutputFields> {
    constructor() {
        super({
            name: 'userCreate',
            description: 'Create a new user',
            route: 'mutation',
            fields: {
                input: userCreateInputFields,
                output: userCreateOutputFields,
            },
        });
    }

    async resolverFn(_: null, input: DTO<typeof userCreateInputFields>) {
        const email = validateUserEmail(input.email);
        const password = validateUserPassword(input.password);
        const phone = validateUserPhone(input.phone);

        const result = await userRepo.insert({
            pid: v4(),
            phone,
            email,
            password: Encryption.encrypt(password, env.PEPPER),
            role: UserRolesEnum.CLIENT,
        });

        if (!result) throw new InternalServerError('Error creating user');

        return {
            isSuccessful: true,
        };
    }
}
