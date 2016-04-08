/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import classNames			from 'classnames';
import _					from 'underscore';
import t					from 'tcomb-form'

let ctx;
export default class Repeated extends t.form.Component {
	constructor(props){
		super(props);
		const value = this.getTransformer().format(props.value)

		this.state = {
			value:			value,
			repeatedValue:	null
		};
	}

	componentWillReceiveProps(props){
		const value = this.getTransformer().format(props.value)
		this.setState({
			value:			value,
			repeatedValue:	null
		})
	}

	componentWillMount(props){
		ctx = this;
	}

	onChangeRep(value){
		value = this.getTransformer().format(value)
		this.setState({
			repeatedValue: value
		})
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

	renderInputs(){
		let {value, repeatedValue, hasError} = this.state;

		let attrs = _.extend(this.props.options.attrs || {}, {
			ref: 'input',
			type: this.props.options.type,
			value: value,
			onChange: function(evt){
				ctx.onChange(evt.target.value);
			}
		});

		let repeatedAttrs = _.extend(this.props.options.repeatedAttrs || {}, {
			ref:		'inputRepeated',
			type:		this.props.options.type,
			value:		repeatedValue,
			onChange:	function(evt){
				ctx.onChangeRep(evt.target.value);
			}
		});

		let label = this.getLabel();
		let input = React.createElement('input', attrs);
		let inputRepeated = React.createElement('input', repeatedAttrs);

		let classes = classNames({
			'form-group':	true,
			'has-error': 	hasError
		});

		return(
			[<div key={0} className={classes}>{label}{input}</div>,
			<div key={1} className={classes}>{inputRepeated}</div>]
		);
	}

	render(){
		let inputs = this.renderInputs();
		let label = this.getLabel();
		return <div className="form:group.repeated">
			{label}{inputs}
		</div>
	}
}
