import {GraphQLEnumType} from 'graphql/type';
import {map} from "../../../utils/iterators";

export function newEnumType(name: string, e: { [s: number]: string }) {
    const vals = Object.getOwnPropertyNames(e);

    return new GraphQLEnumType({
        name: name,
        values: Object.assign(
            {},
            ...map(vals, (val) => {
                return {
                    [val]: {
                        value: val,
                    },
                };
            }),
        ),
    });
}
