

#### Example 1 simple inject props

```js
...
var formOptions = {
    fields:{
        slider: {
			factory: InjectorFactory,
			inject:{
				component: 'input',
				props: {
					type: 'range',
					onBlur: (e)=>{//Do something
						console.log(e.target.value);
					}
				}
			}
		}
    }
}
```

#### Example 2 complex component

Aditional info:
* [tcomb-form](https://github.com/gcanti/tcomb-form)
* [react-datetime](https://github.com/YouCanBookMe/react-datetime)
* [moment.js](https://momentjs.com/docs/)

```js
import t 					from 'tcomb-form'        
import InjectorFactory		from 'tcomb-form-injector';
import DateTime    			from 'react-datetime';
import moment				from 'moment';
...

var formType = t.struct({
	name: t.String,
	born: t.String,
	married t.maybe(t.String)
})

var formOptions = {
	fields: {
		name: {label: 'Name: '},

		//inject datetime
		born: {
			label: 'Born date: ',
			factory: InjectorFactory,
            inject: {
                component:   DateTime
            },
			transformer: { //string to date
				format: (value) => moment(value),
				parse: (value) => value.format('YYYY-MM-DD')
			}
		},

		//inject datetime with some customs
		married: {
			label: 'Married date: ',
			factory: InjectorFactory,
            inject: {
                component:   DateTime,
				props: {
					viewMode: 'years'
				}
            },
			transformer: { //string to date
				format: (value) => moment(value),
				parse: (value) => value.format('YYYY-MM-DD')
			}
		}
	}
}

//render...
var person = {
	name: 'Simon',
	born: '1996-07-01'
};
<Form type={formType} options={formOptions} value={person}/>
```

#### Example 3 Repeated field

Note: Automatic validation for both fields

```js
import t from 'tcomb-form'
import {Factories}        from 'tcomb-form-injector'

...

var formOptions = {
	fields: {
		password: {
			factory:		Factories.Repeated,
			type:			'password',
			attrs:			{placeholder: 'Type Password'},
			repeatedAttrs:	{placeholder: 'Repeat password'}
		}
	}
}
```
