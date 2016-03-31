#Injector factory

###About

Inject any component as tcomb-form-field, (autocomplete, datetime, custom, etc)
Validation iextended from tcomb-form and tcomb-form-validation

**New 0.1.0 inject repeated field**


###Instalation
npm install tcomb-form-injector --save

###Example repeated Injection
```js
import t from 'tcomb-form'        
import {Factories}        from from 'tcomb-form-injector'

var formOptions = {
	fields: {
		password: {
			factory:	Factories.repeated,
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
import DateTime     from 'react-datetime';

import TFormFactoryInjector        from from 'tcomb-form-injector'

var formOptions = {
    fields:{
        date: {
            factory: TFormFactoryInjector.InjectorFactory,
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
    valueProp:        'value',
    props:             {},            //component props
    event:            'onChange',    //component event type
    callback:        function(locals, value){
        locals.onChange(value);
    }
}
```
