/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import classNames			from 'classnames';
import _					from 'underscore';
import t					from 'tcomb-form'

import Types				from './Types';
import Factories			from './Factories';

export default class InjectorFactory extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isValid:	true,
			Element:	this.createElement(props.options, props.value),
			value:		this.setValue(props.value, true),
			elementValue: props.value
		};
	}

	//update component
	componentWillReceiveProps(nextProps){
		this.setState({
			Element: 		this.createElement(nextProps.options, nextProps.value),
			elementValue:	nextProps.value,
			value:			this.setValue(nextProps.value, true)
		});
	}

	onChange(value, path){
		this.setState({
			value: value
		}, function(){
			this.props.onChange(value, this.props.ctx.path);
		})
	}

	setValue(value, returnData){
		let elementValue = value;

		if(_.isObject(value)){
			if(value.id !== undefined){
				value = value.id;
			}else if(value.key !== undefined){
				value = value.key;
			}
		}

		if(returnData == true) return value;
	}

	validate(){
		let result = t.validate(this.state.value, this.props.type, this.props.ctx.path);
		this.setState({
			isValid: result.isValid()
		})
		return result;
	}

	getDefaultLabel(){

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

	getPlaceHolder(){
		var opts = this.props.options || {};
	    var ctx = this.props.ctx;

		var placeholder = null;
	    // labels have higher priority
	    if (ctx.auto !== 'none') {
	    	placeholder = !t.Nil.is(opts.placeholder) ? opts.placeholder : ctx.label;
	    }

	    return placeholder;
	}


	createElement(options, value){
		let {component, props, event, callback, valueProp} = options.inject;

		props.placeholder = this.getPlaceHolder();
		if(options.attrs !== undefined){
			props = _.extend(options.attrs, props);
		}

		props.key = Math.floor((Math.random() * 100) + 1);

		valueProp = valueProp || 'value';
		props[valueProp] = value;

		event = event || 'onChange';
		if(callback !== undefined){
			props[event] = callback.bind(null, this);
		}else{
			props[event] = function(evt){
				this.onChange(evt.target.value);
			}
		}

		return React.createElement(component, props);
	}

	render(){
		let {Element} = this.state;

		let label = this.getLabel();

		let classes = classNames({
			field: true,
			error: !this.state.isValid
		});

		return <div className={classes}>
			{label}{Element}
		</div>;
	}
}

InjectorFactory.defaultProps = {
	value: null
}

InjectorFactory.propTypes = {
	value: React.PropTypes.any,
	inject: React.PropTypes.shape({
		component:	React.PropTypes.object.isRequired,
		props:		React.PropTypes.object,
		event:		React.PropTypes.string,
		callback:	React.PropTypes.func,
		valueProp:	React.PropTypes.string
	})
}

exports.Factories	= Factories;
exports.Types		= Types;
