'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flattenObject = exports.queryParameters = exports.fetchJson = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.extractIDFromResourceSelfLink = extractIDFromResourceSelfLink;

var _reactAdmin = require('react-admin');

var _HttpError = require('ra-core/lib/util/HttpError');

var _HttpError2 = _interopRequireDefault(_HttpError);

var _queryString = require('query-string');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function extractIDFromResourceSelfLink(selfLink) {
    return selfLink.match(/[\w\-]+$/)[0];
}

function setSelfHrefAsID(resource) {
    return _extends({}, resource, {
        id: extractIDFromResourceSelfLink(resource[_constants.LINKS_KEY].self.href)
    });
}

function setIDToResourcesList(resources) {
    return resources.map(setSelfHrefAsID);
}

var handlingResponse = function handlingResponse(_ref, resource, type) {
    var status = _ref.status,
        statusText = _ref.statusText,
        headers = _ref.headers,
        body = _ref.body;

    var json = void 0;

    try {
        json = JSON.parse(body);
    } catch (e) {
        // not json, no big deal
    }
    if (status < 200 || status >= 300) {
        return Promise.reject(new _HttpError2.default(json && json.message || statusText, status, json));
    }
    switch (type) {
        case _reactAdmin.GET_ONE:
            return {
                status: status,
                headers: headers,
                body: body,
                json: setSelfHrefAsID(json)
            };
        case _reactAdmin.GET_LIST:
        case _reactAdmin.GET_MANY_REFERENCE:
            return {
                status: status,
                headers: headers,
                body: body,
                json: _extends({}, json, _defineProperty({}, _constants.EMBEDDED_KEY, _defineProperty({}, resource, setIDToResourcesList(json[_constants.EMBEDDED_KEY][resource]))))
            };
        case _reactAdmin.GET_MANY:
            return {
                status: status,
                headers: headers,
                body: body,
                json: setSelfHrefAsID(json)
            };
        default:
            return { status: status, headers: headers, body: body, json: json };
    }
};

var fetchJson = exports.fetchJson = function fetchJson(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resource = arguments[2];
    var type = arguments[3];

    var requestHeaders = options.headers || new Headers({
        Accept: 'application/json'
    });

    if (!requestHeaders.has('Content-Type') && !(options && options.body && options.body instanceof FormData)) {
        requestHeaders.set('Content-Type', 'application/json');
    }
    if (options.user && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }

    return fetch(url, _extends({}, options, { headers: requestHeaders })).then(function (response) {
        var emptyStatusCodes = [204];
        if (emptyStatusCodes.includes(response.status)) {
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: {}
            };
        }
        return response.text().then(function (text) {
            return {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                body: text
            };
        });
    }).then(function (response) {
        return handlingResponse(response, resource, type);
    });
};

var queryParameters = exports.queryParameters = _queryString.stringify;

var isValidObject = function isValidObject(value) {
    if (!value) {
        return false;
    }

    var isArray = Array.isArray(value);
    var isBuffer = Buffer.isBuffer(value);
    var isObject = Object.prototype.toString.call(value) === '[object Object]';
    var hasKeys = !!Object.keys(value).length;

    return !isArray && !isBuffer && isObject && hasKeys;
};

var flattenObject = exports.flattenObject = function flattenObject(value) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (isValidObject(value)) {
        return Object.assign.apply(Object, [{}].concat(_toConsumableArray(Object.keys(value).map(function (key) {
            return flattenObject(value[key], path.concat([key]));
        }))));
    } else {
        return path.length ? _defineProperty({}, path.join('.'), value) : value;
    }
};