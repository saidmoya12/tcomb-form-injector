/**
* Created By @saidmoya12
*/
'use strict';
import React				from 'react';
import classNames			from 'classnames';
import _					from 'underscore';
import t					from 'tcomb-form'

let ctx;
export default class Repeated extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isValid:		true,
			value:			props.value,
			valueRepeated:	null
		}
	}

	//update component
	componentWillReceiveProps(nextProps){
		this.setState({value: nextProps.value});
	}

	onChange(value, path){
		switch (path) {
			case 'repeated':
				this.setState({valueRepeated: value});
				break;
			default:
				this.setState({value: value})
		}
	}

	validate(){
		let {value, valueRepeated} = this.state;
		let result = t.validate(value, this.props.type, this.props.ctx.path);
		let isValid = result.isValid();

		if(result.isValid()){
			if(value !== valueRepeated){
				result = t.validate(undefined, this.props.type, 'repeated')
				isValid = false;
			}
		}
		
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
		let {value, valueRepeated, isValid} = this.state;

		let attrs = _.extend(this.props.options.attrs, {
			ref: 'input',
			type: this.props.options.type,
			onChange: function(evt){
				ctx.onChange(evt.target.value);
			}
		});

		let repeatedAttrs = _.extend(this.props.options.repeatedAttrs, {
			ref: 'inputRepeated',
			type: this.props.options.type,
			onChange: function(evt){
				ctx.onChange(evt.target.value, 'repeated');
			}
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
