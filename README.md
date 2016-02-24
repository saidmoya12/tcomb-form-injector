###Example complex component

	import t from 'tcomb-form'		//@see: https://github.com/gcanti/tcomb-form

	//sample with datetime picker
	import DateTime 	from 'react-datetime'; //@see: https://github.com/YouCanBookMe/react-datetime

	import TFormFactoryInjector		from from 'tcomb-form-injector'

	var formOptions = {
		fields:{
			date: {
				factory: TFormFactoryInjector.InjectorFactory,
				inject: {
					attrs:		{placeholder: 'Reservación'}, //tcomb attrs
					component:	DateTime,
					valueProp: 'defaultValue',
					props: {		//component props
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


#Default settings
inject: {
	attrs: 			null,		//tcomb-form attrs
	component:		null,		//required component
	valueProp:		'value',
	props: 			{},			//component props
	event:			'onChange',
	callback:		function(locals, value){
		locals.value = value
	}
}
