import Bugsnag from '@bugsnag/js'
import Transport from 'winston-transport'
export type BugsnagLogLevel = 'info' | 'error' | 'warning'
export type WinstonLogLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'

export type Meta = object & {
    userId?: string
}

export interface BugsnagTransportOptions extends Transport.TransportStreamOptions {
    express?: boolean;
    level: "silly",
    silent?: boolean
}

export default class BugsnagTransport extends Transport {
    public silent = false;
    public level = "silly";

    constructor(opts?: BugsnagTransportOptions) {
        super(opts)
        this.silent = opts && opts.silent || false;
        this.level = opts && opts.level || "silly";
    }

    public log(info: any, callback: () => void): any {
        setImmediate(() => this.emit('logged', info));
        if (this.silent) return callback();

        const levelMapping: Record<WinstonLogLevel, BugsnagLogLevel> = {
            debug: 'info',
            error: 'error',
            info: 'info',
            silly: 'info',
            verbose: 'info',
            warn: 'warning'
        }
        const { message, level: winstonLevel } = info;

        Bugsnag.notify(message, function (event) {
            event.severity = levelMapping[winstonLevel as WinstonLogLevel]
        })
        return callback();
    }
}