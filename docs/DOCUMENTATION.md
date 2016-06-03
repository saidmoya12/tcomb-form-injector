#tcomb-form-injector

###Instalation
npm install tcomb-form-injector --save

###Example for repeated field
```js
import t from 'tcomb-form'
import {Factories}        from 'tcomb-form-injector'

...

var formOptions = {
	fields: {
		password: {
			factory:		Factories.Repeated,
			type:			'password',
			attrs: 			{placeholder: 'Type Password'},
			repeatedAttrs:	{placeholder: 'Repeat password'}
		}
	}
}
```
###Example complex component

Aditional info:
[tcomb-form](https://github.com/gcanti/tcomb-form)
[react-datetime](https://github.com/gcanti/tcomb-form)

```js
import t from 'tcomb-form'        

//sample with datetime picker
import DateTime    			from 'react-datetime';
import InjectorFactory      from 'tcomb-form-injector';

...

var formOptions = {
    fields:{
        date: {
            factory: InjectorFactory,
            inject: {
                attrs:        {placeholder: 'Reservation date'}, //tcomb attrs
                component:    DateTime,
                valueProp:	 'defaultValue',
                props: {      //component props
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
	component:		 null,			//react component 'select, range or libraries'
    valueProp:       'value',
    props:           {},            //component props
    event:           'onChange',    //component event type
    callback:        function(locals, value){
        locals.onChange(value);
    }
}
```
