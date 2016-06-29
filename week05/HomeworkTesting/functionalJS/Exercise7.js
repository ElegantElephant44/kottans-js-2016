function reduce(arr, fn, initial) {
	return (function recursionFunc(arrIndex, value){
		if(arrIndex > arr.length-1) return value;
		return recursionFunc(arrIndex+1, fn(value, arr[arrIndex], arrIndex, arr))
	})(0,initial)	
}

module.exports = reduce