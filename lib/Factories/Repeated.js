/**
* Created By @saidmoya12
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tcombForm = require('tcomb-form');

var _tcombForm2 = _interopRequireDefault(_tcombForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Repeated = function (_t$form$Textbox) {
	_inherits(Repeated, _t$form$Textbox);

	function Repeated(props) {
		_classCallCheck(this, Repeated);

		var _this = _possibleConstructorReturn(this, _t$form$Textbox.call(this, props));

		_this.state.repeatedValue = '';
		return _this;
	}

	Repeated.prototype.validate = function validate() {
		var _state = this.state,
		    value = _state.value,
		    repeatedValue = _state.repeatedValue;

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
	};

	Repeated.prototype._onChangeRep = function _onChangeRep(value) {
		value = this.getTransformer().format(value);
		this.setState({
			repeatedValue: value
		});
	};

	Repeated.prototype._renderInputs = function _renderInputs() {
		var _state2 = this.state,
		    value = _state2.value,
		    repeatedValue = _state2.repeatedValue,
		    hasError = _state2.hasError;


		var ctx = this;
		var attrs = _extends(this.props.options.attrs || {}, {
			ref: 'input',
			type: this.props.options.type,
			value: value,
			onChange: function onChange(evt) {
				ctx.onChange(evt.target.value);
			}
		});

		var repeatedAttrs = _extends(this.props.options.repeatedAttrs || {}, {
			ref: 'inputRepeated',
			type: this.props.options.type,
			value: repeatedValue,
			onChange: function onChange(evt) {
				ctx._onChangeRep(evt.target.value);
			}
		});

		var label = this.getLabel();
		var input = _react2.default.createElement('input', attrs);
		var inputRepeated = _react2.default.createElement('input', repeatedAttrs);

		var classes = (0, _classnames2.default)({
			'form-group': true,
			'form-group-depth-1': true,
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
	};

	Repeated.prototype.render = function render() {
		var inputs = this._renderInputs();
		var name = this.props.ctx.name;

		var classes = {
			'form-group-repeated': true
		};
		classes['form-group-' + name] = true;

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(classes) },
			inputs
		);
	};

	return Repeated;
}(_tcombForm2.default.form.Textbox);

exports.default = Repeated;