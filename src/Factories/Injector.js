/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import classNames			from 'classnames';
import _					from 'underscore';
import t					from 'tcomb-form'

let ctx;
export default class Injector extends t.form.Component {
	static transformer = {
		format: value => {
			if(t.Nil.is(value)) return false;

			if(_.isObject(value)){
				if(value.id !== undefined){
					value = value.id;
				}else if(value.key !== undefined){
					value = value.key;
				}
			}
			return value;
		},
		parse: value => value
	};

	static numberTransformer = {
		format: value => {
			if(t.Nil.is(value)) return '';

			if(_.isObject(value)){
				if(value.id !== undefined){
					value = value.id;
				}else if(value.key !== undefined){
					value = value.key;
				}
			}
			return value;
		},
		parse: value => {
			return parseNumber(value)
		}
	};

	constructor(props){
		if(props.options.inject === undefined || props.options.inject.component === undefined){
			throw new Error('inject params are required');
		}
		props.options.inject = _.extend({
			props: {},
			'event': 'onChange',
			onChange: function(){}
		}, props.options.inject);
		super(props);

		this.state = _.extend(this.state, {
			elementValue:	props.value
		});
	}

	componentWillReceiveProps(props) {
		if (props.type !== this.props.type) {
	    	this.typeInfo = getTypeInfo(props.type)
	    }
	    const value = this.getTransformer().format(props.value)

		this.setState({
			value:			value,
			elementValue:	props.value
		})
	}

	componentWillMount(props){
		ctx = this;
	}

	getInjectedElement(){
		let {component, props, event, callback, valueProp} = this.props.options.inject;
		let {value, elementValue} = this.state;

		props.key = Math.floor((Math.random() * 100) + 1);
		props.placeholder = this.getPlaceholder();
		props = _.extend(this.props.options.attrs || {}, props);

		valueProp = valueProp || 'value';
		props[valueProp] = elementValue;


		if(callback !== undefined){
			props[event] = callback.bind(null, this);
		}else{
			props[event] = (function(evt){
				this.onChange(evt.target.value);
			}).bind(this)
		}

		return React.createElement(component, props);
	}

	onChange = (value) => {
		this.setState({
			elementValue: value,
			value:	this.getTransformer().format(value)
		}, this.props.onChange(value, this.props.path));
	};

	getTransformer(){
		const options = this.props.options;
		if (options.transformer) {
			return options.transformer;
		}

		let type = this.typeInfo.innerType.meta.name;

		switch (type) {
			case t.Number.meta.name:
				return this.constructor.numberTransformer;
			break;
		}

		return this.constructor.transformer;
	}

	getPlaceholder() {
		const attrs = this.props.options.attrs || {};
		let placeholder = attrs.placeholder
		if (t.Nil.is(placeholder) && this.getAuto() === 'placeholders') {
			placeholder = this.getDefaultLabel()
		}
		return placeholder
	}

	render(){
		let {hasError} = this.state;
		Element = this.getInjectedElement();

		let classes = classNames({
			'form-group':	true,
			'has-error': 	hasError
		});

		let label = this.getLabel();

		return <div className={classes}>
			{label}{Element}
		</div>;
	}
}

Injector.defaultProps = {
	value:	null
}

Injector.propTypes = {
	value: React.PropTypes.any
}

//FIXME: REMOVE THIS, IS A OLD VERSION
Injector.InjectorFactory = function(props){
	console.warn('tcomb-form-injector.InjectorFactory is deprecated, please use direct import instance, see documentation');
	return React.createElement(Injector, props);
};


function parseNumber(value){
	const n = parseFloat(value)
	const isNumeric = (value - n + 1) >= 0
	return isNumeric ? n : toNull(value)
}

function toNull(value) {
	return (t.String.is(value) && value.trim() === '') || Nil.is(value) ? null : value
}
