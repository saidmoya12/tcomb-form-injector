/**
* Created By @saidmoya12
*/
'use strict';


import Types				from './Types';
import Injector				from './Factories/Injector';
import Repeated				from './Factories/Repeated';


export default Injector;

exports.Types		= Types;
exports.Factories	= {
	Repeated:			Repeated,
	InjectorFactory:	Injector
};
