'use strict';

import React				from 'react';
import classNames			from 'classnames';
import _					from 'underscore';
import t					from 'tcomb-form'

let ctx;
class Repeated extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isValid:	true,
			value:		props.value
		}
	}

	//update component
	componentWillReceiveProps(nextProps){
		this.setState({value: nextProps.value});
	}

	onChange(value, path){
		this.setState({
			value: value
		})
	}

	validate(){
		let result = t.validate(this.state.value, this.props.type, this.props.ctx.path);
		let isValid = result.isValid() && (this.refs.input.value === this.refs.inputRepeated.value);

		this.setState({
			isValid: isValid
		});

		return result;
	}

	getLabel() {
		var opts = this.props.options || {};
	    var ctx = this.props.ctx;

		// handling label
	    var label = opts.label;
	    if (!label && ctx.auto === 'labels') {
	      // if labels are auto generated, get the default label
	      label = this.getDefaultLabel();
	    }

	    if(label === undefined){
	    	return null;
	    }

	    return (<label id={opts.id}>{label}</label>);
	}

	renderInputs(){
		ctx = this;
		let {isValid} = this.state;

		let attrs = _.extend(this.props.options.attrs, {
			ref: 'input',
			type: this.props.options.type,
			onChange: function(evt){
				ctx.onChange(evt.target.value);
			}
		});

		let repeatedAttrs = _.extend(this.props.options.repeatedAttrs, {
			ref: 'inputRepeated',
			type: this.props.options.type
		});

		let label = this.getLabel();
		let input = React.createElement('input', attrs);
		let inputRepeated = React.createElement('input', repeatedAttrs);

		let classes = classNames({
			field: true,
			error: !isValid
		});

		return(
			[<div key={0} className={classes}>{label}{input}</div>,
			<div key={1} className={classes}>{inputRepeated}</div>]
		);
	}

	render(){
		let inputs = this.renderInputs();

		return <div className="field.repeated">
			{inputs}
		</div>;
	}
}

exports.Repeated	= Repeated;

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
