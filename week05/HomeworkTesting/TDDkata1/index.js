"use strict"

const add = input =>{
	if(input.length==0) return 0; 
	function addAsInteger(a,b){
		b = (b == "") ? NaN : +b;		
		return a + b;
	}
	let pattern = /[\n,]/g
	if(input.slice(0,2)=="//")
	{
		let startIndex = input.indexOf('\n');
		pattern = input.slice(2,startIndex);
		input = input.substring(startIndex+1);
	}	
	let args = input.split(pattern);

	let negatives = args.filter(x=>{
		return x < 0;
	})
	
	if(negatives.length > 0) throw new Error(`negatives not allowed: ${negatives.join()}`);
	return +args.reduce((sum,next)=>{
		return addAsInteger(sum,next);
	},0)
}

module.exports = add