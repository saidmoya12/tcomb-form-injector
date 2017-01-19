/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import classNames			from 'classnames';
import t					from 'tcomb-form';
import {getTypeInfo}		from 'tcomb-form/lib/util'

let ctx;
export default class Injector extends t.form.Component {
	static transformer = {
		format: value => {
			if(t.Nil.is(value)) return null;

			if(value instanceof Object){
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

	static stringTransformer = {
		format: value => {
			if (t.Nil.is(value)) return '';

			if(value instanceof Object){
				if(value.name !== undefined){
					value = value.name;
				}
			}

			return value
		},
		parse: value => value
	};

	static numberTransformer = {
		format: value => {
			if(t.Nil.is(value)) return '';

			if(value instanceof Object){
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
			throw new Error('inject.component prop is required');
		}

		props.options.inject = Object.assign({
			props: {},
			'event': 'onChange',
		}, props.options.inject);

		super(props);

		this.state = Object.assign(this.state, {
			elementValue:	this.getTransformer().format(props.value)//props.value
		});
	}

	componentWillReceiveProps(props) {
		if (props.type !== this.props.type) {
	    	this.typeInfo = getTypeInfo(props.type)
	    }
		props.options.inject = Object.assign({
			props: {},
			'event': 'onChange',
		}, props.options.inject);

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

		props.key = props.key || this.props.ctx.name;

		props = Object.assign({
			placeholder: this.getPlaceholder()
		}, this.props.options.attrs || {}, props);

		valueProp = valueProp || 'value';
		props[valueProp] = elementValue;

		if(callback !== undefined){
			props[event] = callback.bind(null, this);
		}else{
			props[event] = this._nativeChange.bind(this);
		}

		return React.createElement(component, props);
	}

	_nativeChange = (event) => {
		this.onChange(event.target.value)
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
			case t.String.meta.name:
				return this.constructor.stringTransformer;
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
	value:	''
}

Injector.propTypes = {
	value: 	React.PropTypes.any
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
	return (t.String.is(value) && value.trim() === '') || t.Nil.is(value) ? null : value
}
