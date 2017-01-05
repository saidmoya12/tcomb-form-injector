#tcomb-form-injector

###Instalation
```
npm install tcomb-form-injector --save
```

###Example for repeated field

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

###Example simple component

```js
import InjectorFactory      from 'tcomb-form-injector';
...

var formOptions = {
    fields:{
        slider: {
			factory: InjectorFactory,
            inject: {
                component:		'input',
                props: {
                    type:		'range'
                },
                event: 'onBlur', callback: function(locals, ev){
                    locals.onChange(ev.target.value); //Update component value
                }
            }
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
                callback: function(locals, event){
                    locals.onChange(event.target.value);//update component value
                }
            }
        }
    }
}
```

###Default settings for injector
```js
inject: {
	component:		 undefined,		//REQUIRED! react component 'select, range or libraries'
    valueProp:       'value',
    props:           {},            //component props
    event:           'onChange',    //component event type
    callback:        function(locals, value){
        locals.onChange(value);
    }
}
```
