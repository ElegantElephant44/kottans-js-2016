function Spy(target, method) {
	let spy = {count:0}
	let func = target[method];
	target[method]= function()
	{
		spy.count++;
		return func.apply(this,arguments);
	}
	return spy;
}

module.exports = Spy