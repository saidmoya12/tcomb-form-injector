/**
* Created By @saidmoya12
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _tcombForm = require('tcomb-form');

var _tcombForm2 = _interopRequireDefault(_tcombForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ctx = void 0;

var Repeated = function (_t$form$Component) {
	_inherits(Repeated, _t$form$Component);

	function Repeated(props) {
		_classCallCheck(this, Repeated);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Repeated).call(this, props));

		var value = _this.getTransformer().format(props.value);

		_this.state = {
			value: value,
			repeatedValue: null
		};
		return _this;
	}

	_createClass(Repeated, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			var value = this.getTransformer().format(props.value);
			this.setState({
				value: value,
				repeatedValue: null
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount(props) {
			ctx = this;
		}
	}, {
		key: 'onChangeRep',
		value: function onChangeRep(value) {
			value = this.getTransformer().format(value);
			this.setState({
				repeatedValue: value
			});
		}
	}, {
		key: 'validate',
		value: function validate() {
			var _state = this.state;
			var value = _state.value;
			var repeatedValue = _state.repeatedValue;

			var result = _tcombForm2.default.validate(this.getValue(), this.props.type, this.getValidationOptions());

			var hasError = !result.isValid();

			if (!hasError) {
				if (value !== repeatedValue) {
					result = _tcombForm2.default.validate(undefined, this.props.type, this.getValidationOptions());
					hasError = true;
				}
			}

			this.setState({ hasError: hasError });

			return result;
		}
	}, {
		key: 'renderInputs',
		value: function renderInputs() {
			var _state2 = this.state;
			var value = _state2.value;
			var repeatedValue = _state2.repeatedValue;
			var hasError = _state2.hasError;


			var attrs = _underscore2.default.extend(this.props.options.attrs || {}, {
				ref: 'input',
				type: this.props.options.type,
				value: value,
				onChange: function onChange(evt) {
					ctx.onChange(evt.target.value);
				}
			});

			var repeatedAttrs = _underscore2.default.extend(this.props.options.repeatedAttrs || {}, {
				ref: 'inputRepeated',
				type: this.props.options.type,
				value: repeatedValue,
				onChange: function onChange(evt) {
					ctx.onChangeRep(evt.target.value);
				}
			});

			var label = this.getLabel();
			var input = _react2.default.createElement('input', attrs);
			var inputRepeated = _react2.default.createElement('input', repeatedAttrs);

			var classes = (0, _classnames2.default)({
				'form-group': true,
				'has-error': hasError
			});

			return [_react2.default.createElement(
				'div',
				{ key: 0, className: classes },
				label,
				input
			), _react2.default.createElement(
				'div',
				{ key: 1, className: classes },
				inputRepeated
			)];
		}
	}, {
		key: 'render',
		value: function render() {
			var inputs = this.renderInputs();
			var label = this.getLabel();
			return _react2.default.createElement(
				'div',
				{ className: 'form:group.repeated' },
				label,
				inputs
			);
		}
	}]);

	return Repeated;
}(_tcombForm2.default.form.Component);

exports.default = Repeated;