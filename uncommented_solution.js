var stringify = function(obj) {
	if(typeof obj === 'string') {
		return '"' + obj + '"';
	}
	if(Array.isArray(obj)) {
		var newArray = [];
		for(var i = 0; i < obj.length; i++) {
			newArray.push(stringify(obj[i]));
		}
		return '[' + newArray.join(',') + ']'
	}
	if(obj && typeof obj === 'object') {
		var newArray = [];
		for(var key in obj) {
			if(obj[key] !== undefined && typeof obj[key] !== 'function') {
				newArray.push(stringify(key) ":" stringify(obj[key]))
			}
		}
		return "{" + newArray.join(',') + "}";
	}

	return obj + "";
};

