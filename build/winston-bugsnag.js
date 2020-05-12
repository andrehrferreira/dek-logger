"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var js_1 = tslib_1.__importDefault(require("@bugsnag/js"));
var winston_transport_1 = tslib_1.__importDefault(require("winston-transport"));
var BugsnagTransport = /** @class */ (function (_super) {
    tslib_1.__extends(BugsnagTransport, _super);
    function BugsnagTransport(opts) {
        var _this = _super.call(this, opts) || this;
        _this.silent = false;
        _this.level = "silly";
        _this.silent = opts && opts.silent || false;
        _this.level = opts && opts.level || "silly";
        return _this;
    }
    BugsnagTransport.prototype.log = function (info, callback) {
        var _this = this;
        setImmediate(function () { return _this.emit('logged', info); });
        if (this.silent)
            return callback();
        var levelMapping = {
            debug: 'info',
            error: 'error',
            info: 'info',
            silly: 'info',
            verbose: 'info',
            warn: 'warning'
        };
        var message = info.message, winstonLevel = info.level;
        js_1.default.notify(message, function (event) {
            event.severity = levelMapping[winstonLevel];
        });
        return callback();
    };
    return BugsnagTransport;
}(winston_transport_1.default));
exports.default = BugsnagTransport;
//# sourceMappingURL=winston-bugsnag.js.map