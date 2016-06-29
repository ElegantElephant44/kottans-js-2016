
function curryN(fn, n) {
	if(!n) n = fn.length
	return function curried(argument){
		if(n<=1) return fn(argument)
		return curryN(fn.bind(this,argument), n-1)
	}
}

module.exports = curryN