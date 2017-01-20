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

var _util = require('tcomb-form/lib/util');

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
			throw new Error('inject.component prop is required');
		}

		props.options.inject = _extends({
			props: {},
			'event': 'onChange'
		}, props.options.inject);

		var _this = _possibleConstructorReturn(this, _t$form$Component.call(this, props));

		_this._nativeChange = function (event) {
			_this.onChange(event.target.value);
		};

		_this.onChange = function (value) {
			_this.setState({
				elementValue: value,
				value: _this.getTransformer().format(value)
			}, _this.props.onChange(value, _this.props.path));
		};

		_this.state = _extends(_this.state, {
			elementValue: _this.getTransformer().format(props.value) //props.value
		});
		return _this;
	}

	Injector.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
		if (props.type !== this.props.type) {
			this.typeInfo = (0, _util.getTypeInfo)(props.type);
		}
		props.options.inject = _extends({
			props: {},
			'event': 'onChange'
		}, props.options.inject);

		var value = this.getTransformer().format(props.value);

		this.setState({
			value: value,
			elementValue: props.value
		});
	};

	Injector.prototype.componentWillMount = function componentWillMount(props) {
		ctx = this;
	};

	Injector.prototype.getInjectedElement = function getInjectedElement() {
		var _props$options$inject = this.props.options.inject,
		    component = _props$options$inject.component,
		    props = _props$options$inject.props,
		    event = _props$options$inject.event,
		    callback = _props$options$inject.callback,
		    valueProp = _props$options$inject.valueProp;
		var _state = this.state,
		    value = _state.value,
		    elementValue = _state.elementValue;


		props.key = props.key || this.props.ctx.name;

		props = _extends({
			placeholder: this.getPlaceholder()
		}, this.props.options.attrs || {}, props);

		valueProp = valueProp || 'value';
		props[valueProp] = elementValue;

		if (callback !== undefined) {
			props[event] = callback.bind(null, this);
		} else {
			props[event] = this._nativeChange.bind(this);
		}

		return _react2.default.createElement(component, props);
	};

	Injector.prototype.getTransformer = function getTransformer() {
		var options = this.props.options;
		if (options.transformer) {
			return options.transformer;
		}

		var type = this.typeInfo.innerType.meta.name;

		switch (type) {
			case _tcombForm2.default.Number.meta.name:
				return this.constructor.numberTransformer;
			case _tcombForm2.default.String.meta.name:
				return this.constructor.stringTransformer;
		}

		return this.constructor.transformer;
	};

	//@override


	Injector.prototype.getPlaceholder = function getPlaceholder() {
		var attrs = this.props.options.attrs || {};
		var placeholder = attrs.placeholder;
		if (_tcombForm2.default.Nil.is(placeholder) && this.getAuto() === 'placeholders') {
			placeholder = this.getDefaultLabel();
		}
		return placeholder;
	};

	//@override


	Injector.prototype.getLabel = function getLabel() {
		var label = _t$form$Component.prototype.getLabel.call(this);
		if (label !== undefined) return _react2.default.createElement(
			'label',
			null,
			label
		);
	};

	Injector.prototype.render = function render() {
		var hasError = this.state.hasError;

		var name = this.props.ctx.name;

		Element = this.getInjectedElement();

		var classes = {
			'form-group': true,
			'form-group-depth-1': true,
			'has-error': hasError
		};
		classes['form-group-' + name] = true;

		var label = this.getLabel();

		return _react2.default.createElement(
			'div',
			{ className: (0, _classnames2.default)(classes) },
			label,
			Element
		);
	};

	return Injector;
}(_tcombForm2.default.form.Component);

Injector.transformer = {
	format: function format(value) {
		if (_tcombForm2.default.Nil.is(value)) return null;

		if (value instanceof Object) {
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
Injector.stringTransformer = {
	format: function format(value) {
		if (_tcombForm2.default.Nil.is(value)) return '';

		if (value instanceof Object) {
			if (value.name !== undefined) {
				value = value.name;
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

		if (value instanceof Object) {
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
	value: ''
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
	return _tcombForm2.default.String.is(value) && value.trim() === '' || _tcombForm2.default.Nil.is(value) ? null : value;
}