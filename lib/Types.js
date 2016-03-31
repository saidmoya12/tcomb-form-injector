/**
* Created by @saidmoya12
*/
'use strict';

var _tcombForm = require('tcomb-form');

var _tcombForm2 = _interopRequireDefault(_tcombForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tcombForm2.default.NumStr = _tcombForm2.default.subtype(_tcombForm2.default.Any, function (val) {
	if (val === null) return false;
	if (!isNaN(val) || typeof val === "string") return true;
	return false;
});

_tcombForm2.default.Array = _tcombForm2.default.subtype(_tcombForm2.default.Any, function (val) {
	if (val === null) return false;
	if (Object.prototype.toString.call(val) === '[object Array]') {
		return true;
	}
	return false;
});