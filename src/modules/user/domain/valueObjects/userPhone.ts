import {againstAtLeast, againstAtMost, againstNotString, againstNullOrUndefined} from '../../../../core/guard';

export function validateUserPhone(phone: string) {
    againstNullOrUndefined('phone', phone);
    againstNotString('phone', phone);
    againstAtLeast('phone', phone.length, 6);
    againstAtMost('phone', phone.length, 20);
    return phone;
}
