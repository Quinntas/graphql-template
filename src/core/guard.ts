import {GraphQLError} from 'graphql/index';
import {validateArray, validateBoolean, validateEnum, validateNullOrUndefined, validateNumber, validateObject, validateString} from '../utils/validations';

export function againstNotString(key: string, argument: any): argument is string {
    if (!validateString(argument)) throw new GraphQLError(`${key} is not a string`);
    return true;
}

export function againstNotNumber(key: string, argument: any): argument is number {
    if (!validateNumber(argument)) throw new GraphQLError(`${key} is not a number`);
    return true;
}

export function againstNotBoolean(key: string, argument: any): argument is boolean {
    if (!validateBoolean(argument)) throw new GraphQLError(`${key} is not a boolean`);
    return true;
}

export function againstNotArray<T extends object = any>(key: string, argument: T): argument is T {
    if (!validateArray(argument)) throw new GraphQLError(`${key} is not an array`);
    return true;
}

export function againstNotObject<T extends object = any>(key: string, argument: T): argument is T {
    if (!validateObject(argument)) throw new GraphQLError(`${key} is not an object`);
    return true;
}

export function againstNullOrUndefined(key: string, argument: any) {
    if (validateNullOrUndefined(argument)) throw new GraphQLError(`${key} is null or undefined`);
}

export function againstAtMost(key: string, argument: number, max: number) {
    if (argument > max) throw new GraphQLError(`${key} is greater than ${max}`);
}

export function againstAtLeast(key: string, argument: number, min: number) {
    if (argument < min) throw new GraphQLError(`${key} is less than ${min}`);
}

export function againstAtLeastOneElement(key: string, argument: any[]) {
    if (argument.length === 0) throw new GraphQLError(`${key} is empty`);
}

export function againstBadFormat(key: string, argument: string, regex: RegExp) {
    if (!regex.test(argument)) throw new GraphQLError(`${key} has a bad format`);
}

export function againstBadEnumValue(key: string, e: {[s: number]: string}, argument: any) {
    if (!validateEnum(e, argument)) throw new GraphQLError(`${key} is not part of the enum`);
}
