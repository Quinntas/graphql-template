import {map} from '../utils/iterators';
import {Domain as BaseDomain} from './domain';

/**
 * BaseMapper class is an abstract class that provides basic mapping functionality for converting
 * raw objects to domain objects and vice versa.
 * @typeparam Domain - The domain object type that this mapper will be converting to/from.
 */
export abstract class Mapper<Domain extends BaseDomain> implements Mapper<Domain> {
    /**
     * Converts a raw object into a required domain object.
     *
     * @param {object} raw - The raw object to convert into a domain object.
     * @return {Required<Domain>} - The required domain object converted from the raw object.
     */
    abstract toDomain(raw: object): Required<Domain>;

    /**
     * Converts the provided data to public domain format.
     *
     * @param {Domain} data - The original data to be converted to public domain.
     * @return {Partial<Domain>} - The converted data in public domain format.
     */
    abstract toPublicDomain(data: Domain): Partial<Domain>;

    /**
     * Converts an array of raw data objects to an array of Domain objects.
     *
     * @param {any[]} data - The array of raw data objects to be converted.
     * @return {Domain[]} - The array of converted Domain objects.
     */
    rawToDomainList(data: any[]): Domain[] {
        return map(data, (raw) => {
            return this.toDomain(raw);
        });
    }

    /**
     * Converts an array of raw data objects to an array of domain objects.
     *
     * @param {Domain[]} data - The array of raw data objects to be converted.
     * @return {Domain[]} - The array of domain objects.
     */
    toDomainList(data: Domain[]): Domain[] {
        return map(data, (raw) => {
            return this.toDomain(raw);
        });
    }

    /**
     * Converts an array of Domain objects to an array of Partial<Domain> objects.
     *
     * @param {Domain[]} data - The input array of Domain objects.
     *
     * @return {Partial<Domain>[]} - The converted array of Partial<Domain> objects.
     */
    toPublicDomainList(data: Domain[]): Partial<Domain>[] {
        return map(data, (raw) => {
            return this.toPublicDomain(raw);
        });
    }
}
