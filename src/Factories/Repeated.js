/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import PropTypes			from 'prop-types';
import classNames			from 'classnames';
import t					from 'tcomb-form'

export default class Repeated extends t.form.Textbox {
	constructor(props){
		super(props);
		this.state.repeatedValue = '';
	}

	shouldComponentUpdate(nextProps, nextState){
		const should = (
			nextState.value !== this.state.value ||
			nextState.repeatedValue !== this.state.repeatedValue ||
			nextState.hasError !== this.state.hasError ||
			nextProps.options !== this.props.options ||
			nextProps.type !== this.props.type
		)

		return should;
	}

	validate(){
		let {value, repeatedValue} = this.state;
		let result = t.validate(this.getValue(), this.props.type, this.getValidationOptions())

		let hasError = !result.isValid();

		if(!hasError){
			if(value !== repeatedValue){
				result = t.validate(undefined, this.props.type, this.getValidationOptions())
				hasError = true;
			}
		}

		this.setState({ hasError: hasError })
		return result;
	}



	_onChangeRep(value){
		value = this.getTransformer().format(value)
		this.setState({
			repeatedValue: value
		})
	}

	_renderInputs(){
		let {value, repeatedValue, hasError} = this.state;

		let attrs = Object.assign(this.props.options.attrs || {}, {
			ref: 'input',
			type: this.props.options.type,
			value: value,
			onChange: (evt) => {
				this.onChange(evt.target.value);
			}
		});

		let repeatedAttrs = Object.assign(this.props.options.repeatedAttrs || {}, {
			ref:		'inputRepeated',
			type:		this.props.options.type,
			value:		repeatedValue,
			onChange:	(evt) => {
				this._onChangeRep(evt.target.value);
			}
		});

		let label = this.getLabel();
		let input = React.createElement('input', attrs);
		let inputRepeated = React.createElement('input', repeatedAttrs);

		let classes = classNames({
			'form-group':			true,
			'form-group-depth-1':	true,
			'has-error': 			hasError
		});

		return(
			[<div key={0} className={classes}>{label}{input}</div>,
			<div key={1} className={classes}>{inputRepeated}</div>]
		);
	}

	render(){
		let inputs = this._renderInputs();
		let name = this.props.ctx.name;

		let classes = {
			'form-group-repeated':	true
		};
		classes['form-group-'+name] = true;

		return <div className={classNames(classes)}>
			{inputs}
		</div>
	}
}

Repeated.propTypes = {
	repeatedValue: PropTypes.any
}
