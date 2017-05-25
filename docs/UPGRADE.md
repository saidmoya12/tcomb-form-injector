#tcomb-form-injector

###UPGRADE LIST
**0.3.3**
- include PropTypes instance of React.PropTypes
- Now you can access to ref injected coponent
```js
//injected some datepicker
onChange((locals, value)=>{
	let MyInjectedComponent = locals.refs.component;
	...
})
```

**0.3.0**
Last upgrades for compatibility with
tcomb-form 0.9.10
React 15.4 (Null for string fileds isn't still support in react)

Fix issues
- Fixed Issue #2 IE 10 Unable to get property 'hasError' of undefined or null reference
- Test with consistent key (Pending for check) Issue #3

**0.2.0**
Now support tcomb-form v0.9.3 or latest

**0.1.2**
Fix error class

**0.1.1**
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
Employ direct import instance
```js
import InjectorFactory from 'tcomb-form-injector'
...
var formnewOptions = {
	fields: {
		date: {
			factory: InjectorFactory,
			...
		}
	}
}
```

**New 0.1.0**
Repeated field factory
