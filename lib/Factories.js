'use strict';

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

var ctx = undefined;

var Repeated = function (_React$Component) {
	_inherits(Repeated, _React$Component);

	function Repeated(props) {
		_classCallCheck(this, Repeated);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Repeated).call(this, props));

		_this.state = {
			isValid: true,
			value: props.value
		};
		return _this;
	}

	//update component


	_createClass(Repeated, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.setState({ value: nextProps.value });
		}
	}, {
		key: 'onChange',
		value: function onChange(value, path) {
			this.setState({
				value: value
			});
		}
	}, {
		key: 'validate',
		value: function validate() {
			var result = _tcombForm2.default.validate(this.state.value, this.props.type, this.props.ctx.path);
			var isValid = result.isValid() && this.refs.input.value === this.refs.inputRepeated.value;

			this.setState({
				isValid: isValid
			});

			return result;
		}
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
		key: 'renderInputs',
		value: function renderInputs() {
			ctx = this;
			var isValid = this.state.isValid;


			var attrs = _underscore2.default.extend(this.props.options.attrs, {
				ref: 'input',
				type: this.props.options.type,
				onChange: function onChange(evt) {
					ctx.onChange(evt.target.value);
				}
			});

			var repeatedAttrs = _underscore2.default.extend(this.props.options.repeatedAttrs, {
				ref: 'inputRepeated',
				type: this.props.options.type
			});

			var label = this.getLabel();
			var input = _react2.default.createElement('input', attrs);
			var inputRepeated = _react2.default.createElement('input', repeatedAttrs);

			var classes = (0, _classnames2.default)({
				field: true,
				error: !isValid
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

			return _react2.default.createElement(
				'div',
				{ className: 'field.repeated' },
				inputs
			);
		}
	}]);

	return Repeated;
}(_react2.default.Component);

exports.Repeated = Repeated;

/*
function repeated(locals){
	var tag;

	var attrs = t.mixin({}, locals.attrs);
	var attrsRep = t.mixin({}, locals.attrs);

	attrsRep.id += '_repeated';

	attrs.name += '[0]';
	attrs.disabled = locals.disabled;
	attrs.value = locals.value;
	attrsRep.name += '[1]';
	attrsRep.ref = locals.attrs.name+'Repeated';
	attrsRep.disabled = locals.disabled;

	if (locals.type !== 'textarea') {

		attrsRep.type = attrs.type = locals.type;
	}else{
		tag = 'textarea';
		attrsRep.type = attrsRep.type = null;
	}

	attrs.onChange = function(evt){
		return locals.onChange(evt.target.value);
	}

	var label = [
		getLabel({
		    label: locals.label,
		    htmlFor: attrs.id
		}),
		getLabel({
		    label: locals.config.labelRepeated,
		    htmlFor: attrsRep.id
		}),
	];

	var help = getHelp(locals);
	var error = getError(locals);

	var control = [{
		tag: 'input',
		attrs: attrs
	}, {
		tag: 'input',
		type: locals.type,
		attrs: attrsRep
	}];

	return {
	    tag: 'div',
	    attrs: {
	      className: {
	        field: true,
	        error: locals.hasError,
	        disabled: locals.disabled
	      }
	    },
	    children: [label[0], control[0], label[1], control[1], help, error]
	};
}

//semantic
function getAlert(type, children) {
  var className = {
    ui: true,
    message: true
  };
  className[type] = true;
  return {
    tag: 'div',
    attrs: { className: className },
    children: children
  };
}

function getLabel(opts) {
  if (!opts.label) {
    return;
  }

  return (<label id={opts.id} htmlFor={opts.htmlFor}>{opts.label}</label>);
}

function getHelp(locals) {
  if (!locals.help) {
    return;
  }
  return {
    tag: 'div',
    attrs: {
      className: 'ui pointing label vis@@@@ible',
      id: locals.id + '-tip'
    },
    children: locals.help
  };
}

function getError(locals) {
  if (!locals.hasError || !locals.error) {
    return;
  }
  return {
    tag: 'div',
    attrs: {
      className: 'ui pointing label visible red'
    },
    children: locals.error
  };
}
*/