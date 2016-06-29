module.exports = function arrayMap(arr, fn) {
  	return arr.reduce(function(result, nextValue) {
    		result.push(fn(nextValue));
    		return result
  	}, [])
}