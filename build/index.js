"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _js = _interopRequireDefault(require("@bugsnag/js"));

var _winstonTransport = _interopRequireDefault(require("winston-transport"));

var _pluginExpress = _interopRequireDefault(require("@bugsnag/plugin-express"));

var _scope = require("@dekproject/scope");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BugsnagTransport = /*#__PURE__*/function (_Transport) {
  _inherits(BugsnagTransport, _Transport);

  var _super = _createSuper(BugsnagTransport);

  function BugsnagTransport(opts) {
    var _this;

    _classCallCheck(this, BugsnagTransport);

    _this = _super.call(this, opts);
    _this.silent = opts && opts.silent || false;
    _this.level = opts && opts.level || "silly";

    _js["default"].start({
      apiKey: process.env.LOGGER_BUGSNAG_API_KEY,
      plugins: [_pluginExpress["default"]]
    });

    return _this;
  }

  _createClass(BugsnagTransport, [{
    key: "log",
    value: function log(info, callback) {
      var _this2 = this;

      setImmediate(function () {
        return _this2.emit("logged", info);
      });

      if (this.silent) {
        if (typeof callback == "function") return callback();
        return;
      }

      if (info instanceof Error) _js["default"].notify(info);else if (typeof info.message == "string") _js["default"].notify(new Error(info.message));
      if (typeof callback == "function") return callback();
      return;
    }
  }]);

  return BugsnagTransport;
}(_winstonTransport["default"]);

var _default = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var logger;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            if (!Object.prototype.hasOwnProperty.call(process.env, "LOGGER_BUGSNAG_API_KEY")) {// eslint-disable-next-line no-console

              /*console.log(
                  "[ LOGGER ] - There is no LOGGER_BUGSNAG_API_KEY variable in the .env file."
              );*/
            } else {
              logger = _winston["default"].createLogger({
                level: "info",
                format: _winston["default"].format.json(),
                transports: [new BugsnagTransport({
                  level: "error"
                })]
              });

              if (process.env.NODE_ENV !== "production") {
                logger.add(new _winston["default"].transports.Console({
                  format: _winston["default"].format.simple()
                }));
              }

              _scope.$.set("logger", logger);

              _scope.$.set("bugsnagexpress", _js["default"].getPlugin("express"));
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log("[ Logger ] - ".concat(e.message));
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));

exports["default"] = _default;
//# sourceMappingURL=index.js.map