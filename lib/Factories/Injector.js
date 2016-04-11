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

var Injector = function (_t$form$Component) {
	_inherits(Injector, _t$form$Component);

	function Injector(props) {
		_classCallCheck(this, Injector);

		if (props.options.inject === undefined || props.options.inject.component === undefined) {
			throw new Error('inject params are required');
		}
		props.options.inject = _underscore2.default.extend({
			props: {},
			'event': 'onChange',
			onChange: function onChange() {}
		}, props.options.inject);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Injector).call(this, props));

		_this.onChange = function (value) {
			_this.setState({
				elementValue: value,
				value: _this.getTransformer().format(value)
			}, _this.props.onChange(value, _this.props.path));
		};

		_this.state = _underscore2.default.extend(_this.state, {
			elementValue: props.value
		});
		return _this;
	}

	_createClass(Injector, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			if (props.type !== this.props.type) {
				this.typeInfo = getTypeInfo(props.type);
			}
			var value = this.getTransformer().format(props.value);

			this.setState({
				value: value,
				elementValue: props.value
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount(props) {
			ctx = this;
		}
	}, {
		key: 'getInjectedElement',
		value: function getInjectedElement() {
			var _props$options$inject = this.props.options.inject;
			var component = _props$options$inject.component;
			var props = _props$options$inject.props;
			var event = _props$options$inject.event;
			var callback = _props$options$inject.callback;
			var valueProp = _props$options$inject.valueProp;
			var _state = this.state;
			var value = _state.value;
			var elementValue = _state.elementValue;


			props.key = Math.floor(Math.random() * 100 + 1);
			props.placeholder = this.getPlaceholder();
			props = _underscore2.default.extend(this.props.options.attrs || {}, props);

			valueProp = valueProp || 'value';
			props[valueProp] = elementValue;

			if (callback !== undefined) {
				props[event] = callback.bind(null, this);
			} else {
				props[event] = function (evt) {
					this.onChange(evt.target.value);
				}.bind(this);
			}

			return _react2.default.createElement(component, props);
		}
	}, {
		key: 'getTransformer',
		value: function getTransformer() {
			var options = this.props.options;
			if (options.transformer) {
				return options.transformer;
			}

			var type = this.typeInfo.innerType.meta.name;

			switch (type) {
				case _tcombForm2.default.Number.meta.name:
					return this.constructor.numberTransformer;
					break;
			}

			return this.constructor.transformer;
		}
	}, {
		key: 'getPlaceholder',
		value: function getPlaceholder() {
			var attrs = this.props.options.attrs || {};
			var placeholder = attrs.placeholder;
			if (_tcombForm2.default.Nil.is(placeholder) && this.getAuto() === 'placeholders') {
				placeholder = this.getDefaultLabel();
			}
			return placeholder;
		}
	}, {
		key: 'render',
		value: function render() {
			var hasError = this.state.hasError;

			Element = this.getInjectedElement();

			var classes = (0, _classnames2.default)({
				'form-group': true,
				'has-error': hasError
			});

			var label = this.getLabel();

			return _react2.default.createElement(
				'div',
				{ className: classes },
				label,
				Element
			);
		}
	}]);

	return Injector;
}(_tcombForm2.default.form.Component);

Injector.transformer = {
	format: function format(value) {
		if (_tcombForm2.default.Nil.is(value)) return false;

		if (_underscore2.default.isObject(value)) {
			if (value.id !== undefined) {
				value = value.id;
			} else if (value.key !== undefined) {
				value = value.key;
			}
		}
		return value;
	},
	parse: function parse(value) {
		return value;
	}
};
Injector.numberTransformer = {
	format: function format(value) {
		if (_tcombForm2.default.Nil.is(value)) return '';

		if (_underscore2.default.isObject(value)) {
			if (value.id !== undefined) {
				value = value.id;
			} else if (value.key !== undefined) {
				value = value.key;
			}
		}
		return value;
	},
	parse: function parse(value) {
		return parseNumber(value);
	}
};
exports.default = Injector;


Injector.defaultProps = {
	value: null
};

Injector.propTypes = {
	value: _react2.default.PropTypes.any
};

//FIXME: REMOVE THIS, IS A OLD VERSION
Injector.InjectorFactory = function (props) {
	console.warn('tcomb-form-injector.InjectorFactory is deprecated, please use direct import instance, see documentation');
	return _react2.default.createElement(Injector, props);
};

function parseNumber(value) {
	var n = parseFloat(value);
	var isNumeric = value - n + 1 >= 0;
	return isNumeric ? n : toNull(value);
}

function toNull(value) {
	return _tcombForm2.default.String.is(value) && value.trim() === '' || Nil.is(value) ? null : value;
}