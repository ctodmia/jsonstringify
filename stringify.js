//The following code is a reimplementation of the native Javascript method JSON.stringify
//keep reading for the though process that lead to the solution
var stringify = function(obj) {
	//checks if the input obj is a function statement or undefined
	if(typeof obj === 'undefined' || typeof obj === 'function') {
		return undefined;
	}

	//checks if the input obj is a string 
	if(typeof obj === 'string') {
		return '"' + obj + '"';
	}

	//checks if the input obj is a array/nest array
	if(Array.isArray(obj)) {
		var newArray = [];
		for(var i = 0; i < obj.length; i++) {
			if(obj[i] === undefined || typeof obj[i] === 'function') {
				newArray.push(stringify(null));
			} else {
				newArray.push(stringify(obj[i]));	
			}
		}
		return '[' + newArray.join(',') + ']';
	}

	//checks if the input obj is an object literal and if it is defined 
	if(obj && typeof obj === 'object') {
		var newObjArray = [];
		for(var key in obj) {
			if(obj[key] !== undefined || typeof obj[key] !== 'function') {
				newObjArray.push(stringify(key) + ":" + stringify(obj[key]));
			}
		}
		return "{" + newObjArray.join(',') + "}";
	}
	//will take care of any other edge cases such as numbers and null 
	return obj + "";
};

//Implementation and thought process

//The first thing I needed to do to solve this problem was find all the edge cases related to 
//JSON.stringify. I used MDN for to explore the possibilities and limitations related to the method.
//I discovered the following:
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
	//arrays/nested arrays - [], [9, 'hello'], [[[[[8]]]]], [7, []], 'hey'], [me: you, you: me]
	//objects/nested objects - {}, ["a": {"b":"hello"}] etc

//***NOTE the following cannot be stringified. 
	//JSON.stringify(function(){})                                  // undefined
	//JSON.stringify(undefined)                                     // undefined
	//JSON.stringify({false: undefined, function: function(){}})    // '{}'
	//JSON.stringify([undefined, function(){}])                     // "[null, null]"
//special characters cannot return anything and throw errors. For example: 
	//JSON.stringify(k)     // ERROR: k is not defined
	//JSON.stringify(:)     //Uncaught SyntaxError: Unexpected token :

//the first thing is to write base cases for the inputs that I know I cannot stringify. 
//I can use the typeof method to return undefined anytime the input is a function or undefine. 
//I know that for numbers, booleans, null, I can return input + "" 
	//so for example 
		//9 + "" ==> "9"
		//false + "" ==> "false"
		//true + "" ==> "true"
//I also know that I can use the "typeof" property in javascript to determine if the input 
//is a string
//so if the typeof input is a string I will return '"' + input '"'

//The next input type that I have to deal with are arrays. This is tricky because the 
//javascript interpretter does not return the array that I am expecting. I can't just 
//use the typeof to check if its an array because both arrays, objects and null will 
//return object. So instead I use the Array.isArray() method. Next I found that I can't 
//just wrap quotes around an empty array and get the desired result. 
//For example:
	//var in = [];
	//'"' + in + '"' ==> '""' 

//I can get around this by doing the following:
	//var in = [];
	//"[" + in + "]" ==> '[]'
//next I am going to deal with nested arrays. Again the javascript interpreter does not 
//return the stringified arrays as I am expecting. For example I know my algorithm should 
//do the following : 

	//stringify([1, 'false', false]); // '[1,"false",false]'
	//But when I do run the code below here's what happens:
		//var a = [1, "false", false];
		//"[" + a + "]" ==> '[1, false, false]' 
	//these results let me know that I have to iterate over each element in the array 
	//and check for its type. The best way to get internal quotes around the "false" 
	//is to recursively invoke my stringify function on each element and push the 
	//returned value into a new array. I can return the stringified version of my 
	//new array as 

	// "[" + newarray.join(',') + "]"

	//Before pushing in an element to my new array I have to check if the element is undefined
	//or a function because 
		//JSON.stringify([undefined, function(){}]) ==> "[null, null]"
	//if the element within an array is undefined or a function I have to invoke the stringify function
	//on null and push that result into my new array. 

//Finally I need my code to deal with object literals. For an input to qualify as an 
//object literal the type of input must be true and the input must return true. This 
//will especially take care of cases in which input = null; since null and undefined 
//will return false it will not qualify as an object literal. From here objects will 
//be stringified similar to arrays

//I will iterate through each key in an object. I need to push the key and value into 
//the the array in a very specific way. 
	//newarry.push(stringify(key) + ":" + stringify(obj[key]))
//then I would return the full stringified obj as followed: 
	//"{" + newarray.join(',') + "}"

	//before pushing in the key/value I need to make sure it is neither a function nor 
	//undefine because: 
		//JSON.stringify({false: undefined, function: function(){}})    // '{}'
	//my code will do nothing if the input is undefined or the typeof input is a function

//That should take care of the most obvious cases. Now for some pseudocode to outline 
//my plan of attack : 

	//Create a function called stringify that takes an object as a arguement.
	//check if the type of object is undefined or a function
		//if yes return undefined
	//check if the type of object is a string
		//if its true return the stringified object 
	//check if the object is an array
		//if true create a new array variable that is equal to an empty array
		//iterate through the length of the object array
			//if the element at a given index is undefined or a function 
				//recursion: invoke the stringify function on null and push the result into the new array
			//else 	
				//recursion: invoke the stringify function on the value at the given index
				//and push the result into the new array
		//return the concatenation of the  new array with quoted brackets on each side.  
	//else check to see if the object is equal to true and the typeof function returns 
	//true for object
		//if true, create a new array variable that is equal to an empty array
		//iterate through each key in the object.
			//if the obj[key] is NOT equal to undefined or the typeof obj[key] is NOT function
				//recursion: invoke the stringify function on the key and the value and 
				//push formatted property into the new array
		//return the concatenation of the new array with quoted curly braces on each side. 
	//after all checks return the obj plus "" to take care of all other edge cases such as 
	//numbers and booleans. 

//To reiterate the solution is as followed: 

//Create a function called stringify that takes an object as a arguement.
var stringify = function(obj) {
	//check if the type of object is undefined or a function
	if(typeof obj === 'undefined' || typeof obj === 'function') {
		//if yes return undefined
		return undefined;
	}

	//check if the type of object is a string
	if(typeof obj === 'string') {
		//if its true return the stringified object 
		return '"' + obj + '"';
	}

	//checks if the input obj is a array/nest array
	if(Array.isArray(obj)) {
		//if true create a new array variable that is equal to an empty array
		var newArray = [];
		//iterate through each key in the object.
		for(var i = 0; i < obj.length; i++) {
			//if the element at a given index is undefined or a function 
			if(obj[i] === undefined || typeof obj[i] === 'function') {
				//recursion: invoke the stringify function on null and push the result into the new array
				newArray.push(stringify(null));
			} else {
				//recursion: invoke the stringify function on the value at the given index
				//and push the result into the new array
				newArray.push(stringify(obj[i]));	
			}
		}
		//return the concatenation of the  new array with quoted brackets on each side.  
		return '[' + newArray.join(',') + ']';
	}

	//checks if the input obj is an object literal and if it is defined 
	if(obj && typeof obj === 'object') {
		//if true, create a new array variable that is equal to an empty array
		var newObjArray = [];
		//iterate through each key in the object.
		for(var key in obj) {
			//if the obj[key] is NOT equal to undefined or the typeof obj[key] is NOT function
			if(obj[key] !== undefined || typeof obj[key] !== 'function') {
				//recursion: invoke the stringify function on the key and the value and 
				//push formatted property into the new array
				newObjArray.push(stringify(key) + ":" + stringify(obj[key]));
			}
		}
		//return the concatenation of the new array with quoted curly braces on each side. 
		return "{" + newObjArray.join(',') + "}";
	}
	//will take care of any other edge cases such as numbers and null 
	return obj + "";
};
