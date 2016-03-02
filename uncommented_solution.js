var stringify = function(obj) {
	if(typeof obj === 'undefined') {
		return undefined;
	}

	if(typeof obj === 'function') {
		return undefined;
	}

	if(typeof obj === 'string') {
		return '"' + obj + '"';
	}

	if(Array.isArray(obj)) {
		var newArray = [];
		for(var i = 0; i < obj.length; i++) {
			if(obj[i] !== undefined && typeof obj[i] !== 'function') {
				newArray.push(stringify(obj[i]));	
			}
		}
		return '[' + newArray.join(',') + ']';
	}
	
	if(obj && typeof obj === 'object') {
		var newObjArray = [];
		for(var key in obj) {
			if(obj[key] !== undefined && typeof obj[key] !== 'function') {
				newObjArray.push(stringify(key) + ":" + stringify(obj[key]));
			}
		}
		return "{" + newObjArray.join(',') + "}";
	}

	return obj + "";
};
