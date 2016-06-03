#tcomb-form-injector

###UPGRADE LIST

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
