function getDependencies(tree) {
	let result = {};
	(function analyze(tree)
	{
		let next = tree['dependencies'];		
		if(!next) return;
		for (let prop in next)
		{
			let propName = prop+'@'+next[prop]['version'];
			result[propName] = true;
			analyze(next[prop]);
		}
	})(tree)

	return Object.keys(result).sort();

  
}

module.exports = getDependencies