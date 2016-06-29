"use strict"
require('chai').should()
var expect = require('chai').expect;

const add = require('../')
describe ("add", () =>{
	it("should be a function with one parameter", ()=> {
		add.should.be.a("function")
			.have.lengthOf(1)
	})
	it("should return 0 for empty string", () =>{
		add('').should.equal(0)
	})

	it("should add some numbers of ints",() =>{
		add('0').should.equal(0)
		add('1').should.equal(1)
		add('1,2').should.equal(3)
	})

	it("should handle unknown amount of numbers", () => {
		add('1,12,34,5,6,7,8,9').should.equal(82)
		add('34,22').should.equal(56)
		add('333').should.equal(333)

	})

	it('should handle new lines between numbers', ()=>{
		add('1,12\n34,5,6,7,8,9').should.equal(82)
		add('34\n22').should.equal(56)
	})
	it('should return NaN for NOT ok input', ()=>{
		add("1,\n").should.be.NaN;
	})
	it('should handle different delimeters', ()=>{
		add('//;\n1;2').should.equal(3)
		add('// delim \n1 delim 2').should.equal(3)
		add('//+\n5+6').should.equal(11)
	})

	it('should throw error if add call with negative numbers and show all negatives', ()=>{
		expect(add.bind(this, '1,-12\n34,-5,6,-7,8,9')).to.throw('negatives not allowed: -12,-5,-7');
		
	})

	

})