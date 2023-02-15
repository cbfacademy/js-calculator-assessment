const chai = require('chai');
const expect = chai.expect;

const calculator = require('../calculator');

describe('Calculator', () => {
  describe('Addition', () => {
    it('should sum two numbers', () => {
      expect(calculator.add(2, 2)).to.equal(4)
      expect(calculator.add(50, 30)).to.equal(80)
    })
  })
  describe('Subtraction', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(2, 2)).to.equal(0)
      expect(calculator.subtract(50, 1)).to.equal(49)
    })
  })
});