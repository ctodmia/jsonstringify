//Implement a function called stringify that emulates JSON.stringify. If you wanted it to be easy you'd say stringify = JSON.stringify - but we're looking for a solution from scratch.

// The proper implementation of my code should output the following: 
  	//stringify({});                  // '{}'
	//stringify(true);                // 'true'
	//stringify('foo');               // '"foo"'
	//stringify([1, 'false', false]); // '[1,"false",false]'
	//stringify({ x: 5 });            // '{"x":5}'
//the function that I create must wrap quotes around the argument that is passed into it.

//The solution must take into account the following input values:

	//strings - 'hello'
	//numbers - 9;
	//null - null
	//booleans - true, false
	//arrays/nested arrays - [], [9, 'hello'], [[[[[8]]]]], [7, []], 'hey'], [me: you, you: me], etc
	//objects/nested objects - {}, ["a": {"b":"hello"}] etc

//***NOTE the following cannot be stringified. 
	//functions - function(){}
	//undefined - undefined


//the first thing is to write base cases for the inputs that I know how to stringify
//I know that for numbers, booleans, null, and undefined I can return input + "" 
	//so for example 
		//9 + "" ==> "9"
		//false + "" ==> "false"
		//true + "" ==> "true"
//I also know that I can use the "typeof" property in javascript to determine if the input is a string
//so if the typeof input is a string I will return '"' + input '"'

//The next input type that I have to deal with are arrays. This is tricky because the javascript interpretter does not return the array that I am expecting. I can't just use the typeof to check if its an array because both arrays, functions, and null will return object. So instead I use the Array.isArray() method. Next I found that I can't just wrap quotes around an empty array and get the desired result. 
//For example:
	//var in = [];
	//'"' + in + '"' ==> '""' (check your console to verify)

//I can get around this by doing the following:
	//var in = [];
	//"[" + in + "]" ==> '[]'
//next I am going to deal with nested arrays. Again the javascript interpreter does not return the stringified arrays as I am expecting. For example I know my algorithm should do the following : 

	//stringify([1, 'false', false]); // '[1,"false",false]'
	//But when I do run the code below here's what happens:
		//var a = [1, "false", false];
		//"[" + a + "]" ==> '[1, false, false]' (Oh nooooo!)
	//these results let me know that I have to iterate over each element in the array and check for its type. The best way to get internal quotes around the "false" is to recursively invoke my stringify function on each element and push the returned value into a new array. I can return the stringified version of my new array as 

	// "[" + newarray.join(',') + "]"

//Finally I need my code to deal with object literals. For an input to qualify as an object literal the type of input must be true and the input must return true. This is will especially take care of cases in which input = null; since null and undefined will return false it will not qualify as an object literal. From here objects will be stringified similar to arrays

//I will iterate through each key in an object. I need to push the key and value into the the array in a very specific way. 
	//newarry.push(stringify(key) + ":" + stringify(obj[key]))
//then I would return the full stringified obj as followed: 
	//"{" + newarray.join(',') + "}"

//That should take care of the most obvious cases. Now for some pseudocode to outline my plan of attack : 

	//Create a function called stringify that takes an object as a arguement.
	//check if the type of object is a string
		//if its true return the stringified object 
	//check if the object if an array
		//if true create a new array variable that is equal to an empty array
		//iterate through the length of the object array
			//recursion: invoke the stringify function on the value at the given index
		//return the concatenation of the  new array with quoted brackets on each side.  
	//else check to see if the object is equal to true and the typeof function returns true for object
		//if true create a new array variable that is equal to an empty array
		//iterate through each key in the object. 
			//recursion: invoke the stringify function on the key and the value and push formatted 
		//return the concatenation of the new array with quoted curly braces on each site. 

//Solution
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


