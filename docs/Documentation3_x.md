## tcomb-form-injector

### About
Inject any component as tcomb-form field, (autocomplete, datetime, custom, etc) Validation extended from tcomb-form and tcomb-form-validation

* Allow JSON values


#### Instalation
```
npm install tcomb-form-injector --save
```

[See 2.x documentation](documentation2_x.md)


#### Basic Usage example

```js
import t                     from 'tcomb-form'        
import InjectorFactory       from 'tcomb-form-injector';
import DateTime              from 'react-datetime';
import moment                from 'moment';
...

var formType = t.struct({
    born: t.String
})

var formOptions = {
    fields: {
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
        }
    }
}

//render...
var person = { born: '1996-07-01' };
<Form type={formType} options={formOptions} value={person}/>
```
Aditional info:
* [tcomb-form](https://github.com/gcanti/tcomb-form)
* [react-datetime](https://github.com/YouCanBookMe/react-datetime)
* [moment.js](https://momentjs.com/docs/)

---
##### [See more examples...](Examples.md)
---

#### Settings - injector

|           | Default Value      | Type             | Description               |
|-----------|--------------------|------------------|---------------------------|
| component | undefined          | Component/string | React component to inject |
| valueProp | value              | any              | Component "Value" prop    |
| props     | {}                 | object           | Component props           |
| event     | onChange           | string           | Component Event Listener  |
| callback  | Component callback | function         | Event callback            |
