function duckCount() {
	return Array.prototype.filter.call(arguments,(value)=>{
		return Object.prototype.hasOwnProperty.call(value, 'quack');
	}).length;
}

module.exports = duckCount