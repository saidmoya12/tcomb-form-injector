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

var _Types = require('./Types');

var _Types2 = _interopRequireDefault(_Types);

var _Factories = require('./Factories');

var _Factories2 = _interopRequireDefault(_Factories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InjectorFactory = function (_React$Component) {
	_inherits(InjectorFactory, _React$Component);

	function InjectorFactory(props) {
		_classCallCheck(this, InjectorFactory);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InjectorFactory).call(this, props));

		_this.state = {
			isValid: true,
			Element: _this.createElement(props.options, props.value),
			value: _this.setValue(props.value, true),
			elementValue: props.value
		};
		return _this;
	}

	//update component


	_createClass(InjectorFactory, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				Element: this.createElement(nextProps.options, nextProps.value),
				elementValue: nextProps.value,
				value: this.setValue(nextProps.value, true)
			});
		}
	}, {
		key: 'onChange',
		value: function onChange(value, path) {
			this.setState({
				value: value
			}, function () {
				this.props.onChange(value, this.props.ctx.path);
			});
		}
	}, {
		key: 'setValue',
		value: function setValue(value, returnData) {
			var elementValue = value;

			if (_underscore2.default.isObject(value)) {
				if (value.id !== undefined) {
					value = value.id;
				} else if (value.key !== undefined) {
					value = value.key;
				}
			}

			if (returnData == true) return value;
		}
	}, {
		key: 'validate',
		value: function validate() {
			var result = _tcombForm2.default.validate(this.state.value, this.props.type, this.props.ctx.path);
			this.setState({
				isValid: result.isValid()
			});
			return result;
		}
	}, {
		key: 'getDefaultLabel',
		value: function getDefaultLabel() {}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			var opts = this.props.options || {};
			var ctx = this.props.ctx;

			// handling label
			var label = opts.label;
			if (!label && ctx.auto === 'labels') {
				// if labels are auto generated, get the default label
				label = this.getDefaultLabel();
			}

			if (label === undefined) {
				return null;
			}

			return _react2.default.createElement(
				'label',
				{ id: opts.id },
				label
			);
		}
	}, {
		key: 'getPlaceHolder',
		value: function getPlaceHolder() {
			var opts = this.props.options || {};
			var ctx = this.props.ctx;

			var placeholder = null;
			// labels have higher priority
			if (ctx.auto !== 'none') {
				placeholder = !_tcombForm2.default.Nil.is(opts.placeholder) ? opts.placeholder : ctx.label;
			}

			return placeholder;
		}
	}, {
		key: 'createElement',
		value: function createElement(options, value) {
			var _options$inject = options.inject;
			var component = _options$inject.component;
			var props = _options$inject.props;
			var event = _options$inject.event;
			var callback = _options$inject.callback;
			var valueProp = _options$inject.valueProp;


			props.placeholder = this.getPlaceHolder();
			if (options.attrs !== undefined) {
				props = _underscore2.default.extend(options.attrs, props);
			}

			props.key = Math.floor(Math.random() * 100 + 1);

			valueProp = valueProp || 'value';
			props[valueProp] = value;

			event = event || 'onChange';
			if (callback !== undefined) {
				props[event] = callback.bind(null, this);
			} else {
				props[event] = function (evt) {
					this.onChange(evt.target.value);
				};
			}

			return _react2.default.createElement(component, props);
		}
	}, {
		key: 'render',
		value: function render() {
			var Element = this.state.Element;


			var label = this.getLabel();

			var classes = (0, _classnames2.default)({
				field: true,
				error: !this.state.isValid
			});

			return _react2.default.createElement(
				'div',
				{ className: classes },
				label,
				Element
			);
		}
	}]);

	return InjectorFactory;
}(_react2.default.Component);

exports.default = InjectorFactory;


InjectorFactory.defaultProps = {
	value: null
};

InjectorFactory.propTypes = {
	value: _react2.default.PropTypes.any,
	inject: _react2.default.PropTypes.shape({
		component: _react2.default.PropTypes.object.isRequired,
		props: _react2.default.PropTypes.object,
		event: _react2.default.PropTypes.string,
		callback: _react2.default.PropTypes.func,
		valueProp: _react2.default.PropTypes.string
	})
};

exports.Factories = _Factories2.default;
exports.Types = _Types2.default;