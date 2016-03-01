// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
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
//I know that for numbers and booleans I can return input + "" 
	//so for example 
		//9 + "" ==> "9"
		//false + "" ==> "false"
		//true + "" ==> "true"
//I also know that I can use the "typeof" property in javascript to determine if the input is a string
//so if the typeof input is a string i will return '"' + input '"'

//The next input type that I have to deal with are arrays. This is tricky because the javascript interpretter does not the array that we are expecting. For example:
	//var in = [];
	//'"' + in + '"' ==> '""' (check your console to verify)

//I can get around this by doing the following:
	//var in = [];
	//"[" + in + "]" ==> '[]'
//next I am going to deal with nested arrays. Again the javascript interpreter does not return the stringified arrays as I am expecting. For example I know my algorithm should do the following : 

	//stringify([1, 'false', false]); // '[1,"false",false]'
	


	//so basically we want that whatever we pass as an argument to stringifyJSON  
	//it should wrap quotes around that parameter. 
	//so stringifyJSON([1,2,3]) ==> '[1,2,3]'

	//we got a wonderful clue. look at your fixtures.js file. you will notice that there i an variable 
	//called stringifiableObjects and this is an ARRAY! this array is what our spec is using to inspect
	//our code. with that being said we know we need to iterate over this array and make sure 
	//that each one get stringified to pass all all test. 

	//strategy: for example make 9 ==> '9' think about how to iterate over the array stringifiableObjects.
	//lets also try refactoring the code by making a separate function that adds quotes around obj. 
	//(or is that what this stringifyJSON is suppose to do?)

//works really well when your solving problems in the node. individual step of that problem is the same and the problem is 
//same when you knock off a step from that problem



var stringifyJSON = function(obj) {


//lets start of by writing some of our base cases. We know that there are some unstringifiable and they are
// functions and undefined. 

//recursion and iteration: recursion is great for when you dont know that size of that problem. 

 if(typeof obj === 'string') {
          return '"' + obj + '"';
    }


// now lets see if we can iterate through our array. 
if(Array.isArray(obj)) {
    var stringArrays = [];
//this is where the recursion happens. 
    for(var i = 0; i < obj.length; i++) {
        if(obj[i] === undefined && typeof obj[i] === 'function' ){
            stringArrays.push(stringifyJSON(null));
        } else {
            stringArrays.push(stringifyJSON(obj[i]));
        }
    }

   return '[' + stringArrays.join(',') + ']';
}
    if(obj && typeof obj === 'object'){
      var stringObj = [];
          for(var key in obj){
            if (obj[key] !== undefined && typeof obj[key] !== 'function') { 
               stringObj.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
            }
         }  
         return '{' + stringObj.join(',') + '}';
    } 
    //handles evrything that is not explicitly covered above. 
return obj + "";
};

//Lecture: the recipe we need a base case. check for whether your done. once you've checked you need to take one 
//step closer to the base case. then invocate that function again. 


//solution: douglascrawford JSON github. this is probably not an efficient way to look this up by looking up source code. 

//test driven development 

//var stringifyJSON = function(obj) {
  //1. return obj; check the spec and you will see what the spec is expecting. 
  //2. return obj + ''; this passes the first step 
  //3. if (obj=== 'string') {
    //return '"' + obj + '"';
    //} else if (Array.isArray(obj)) {
      //console.log('obj', obj)
      //var stringifiedArr =stringifyJSON(obj) ==>recurison starts here. we want to go through each variable in the o 
     // '['+ stringifiedArray +']' ==> 
    //}
    //return obj +'';
//} 

//when you stringify 9 there are no nodes. when you are talking about an array it will have things inside of it 
//that need to be stringifyied. 

//level 1 : [9]
//level 2. : 9


//level 1 : [[1,2,3]]
//level 2 : [1,2,3]
//level 3 : 1,2,3
//all you need to do is solve one level of tha t
//now we can look into object
//follow a similar pattern

//null is an object in javascript

//building the key value pair s

//input && both things have to be true otherwise theres no way it can be true. 
//this is checking to see whether it is defined. if input it undefined it would default to false.
//input = input || 50; if either evaluates to true then the whole thing evaluates to true. not the
//greatest pattern. 