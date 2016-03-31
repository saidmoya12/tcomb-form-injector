'use strict';

import t from 'tcomb-form'

t.NumStr = t.subtype(t.Any, function(val){
	if(val === null) return false;
	if(!isNaN(val) || typeof val === "string") return true;
	return false;
});

t.Array = t.subtype(t.Any, function(val){
	if(val === null) return false;
	if( Object.prototype.toString.call( val ) === '[object Array]' ) {
		return true
	}
	return false;
});
