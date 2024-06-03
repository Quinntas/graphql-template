import {IncomingMessage} from 'http';

export interface DecodedRequest extends IncomingMessage {
    bearer: string;
}
