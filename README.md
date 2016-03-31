#tcomb-form-injector

###About

Inject any component as tcomb-form-field, (autocomplete, datetime, custom, etc)
Validation iextended from tcomb-form and tcomb-form-validation

**New 0.1.1**
Deprecated indirect import
```js
import TFormFactoryInjector from 'tcomb-form-injector'
...
var formOldOptions = {
	fields: {
		date: {
			factory: TFormFactoryInjector.injectorFactory,
			...
		}
	}
}
```
Employ direct access
```js
import injectorFactory from 'tcomb-form-injector'
...
var formnewOptions = {
	fields: {
		date: {
			factory: injectorFactory,
			...
		}
	}
}
```


**New 0.1.0**
Repeated field factory

###Instalation
npm install tcomb-form-injector --save

###Example for repeated field
```js
import t from 'tcomb-form'        
import {Factories}        from from 'tcomb-form-injector'

var formOptions = {
	fields: {
		password: {
			factory:		Factories.repeated,
			type:			'password',
			attrs: 			{placeholder: 'Type Password'},
			repeatedAttrs:	{placeholder: 'Repeat password'}
		}
	}
}
```
###Example complex component

Documentation for example:
[tcomb-form](https://github.com/gcanti/tcomb-form)
[react-datetime](https://github.com/gcanti/tcomb-form)

```js
import t from 'tcomb-form'        

//sample with datetime picker
import DateTime    			from 'react-datetime';
import injectorFactory      from from 'tcomb-form-injector'

var formOptions = {
    fields:{
        date: {
            factory: injectorFactory,
            inject: {
                attrs:        {placeholder: 'Reservación'}, //tcomb attrs
                component:    DateTime,
                valueProp: 'defaultValue',
                props: {        //component props
                    className: 'customClassname'
                },
                event: 'onBlur', callback: function(locals, date){
                    //update value
                    locals.onChange(date.format('YYYY-MM-DD HH:mm:ss'));
                }
            }
        }
    }
}
```

###Default settings for injector
```js
inject: {
    valueProp:       'value',
    props:           {},            //component props
    event:           'onChange',    //component event type
    callback:        function(locals, value){
        locals.onChange(value);
    }
}
```
