export namespace StringUtils {
    export function capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    export function decapitalize(str: string): string {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}
