import Transport from 'winston-transport';
export declare type BugsnagLogLevel = 'info' | 'error' | 'warning';
export declare type WinstonLogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';
export declare type Meta = object & {
    userId?: string;
};
export interface BugsnagTransportOptions extends Transport.TransportStreamOptions {
    express?: boolean;
    level: "silly";
    silent?: boolean;
}
export default class BugsnagTransport extends Transport {
    silent: boolean;
    level: string;
    constructor(opts?: BugsnagTransportOptions);
    log(info: any, callback: () => void): any;
}
