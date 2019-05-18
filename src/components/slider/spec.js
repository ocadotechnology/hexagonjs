import chai from 'chai';

import { div } from 'utils/selection';

import { Slider } from 'components/slider';

export default () => {
  const should = chai.should();

  describe('slider', () => {
    it('value: single initial value is correct', () => {
      const s = new Slider(div());
      s.value().should.equal(0.5);
    });

    it('value: single value setter/getter works', () => {
      const s = new Slider(div());
      s.value().should.equal(0.5);
      s.value(0.8).should.equal(s);
      s.value().should.equal(0.8);
    });

    it('value: range initial value is correct', () => {
      const s = new Slider(div(), { type: 'range' });
      s.value().should.eql({ start: 0.25, end: 0.75 });
    });

    it('value: range value setter/getter works', () => {
      const s = new Slider(div(), { type: 'range' });
      s.value().should.eql({ start: 0.25, end: 0.75 });
      s.value({ start: 0.2, end: 0.8 }).should.equal(s);
      s.value().should.eql({ start: 0.2, end: 0.8 });
    });

    it('discreteValues: initial value is correct', () => {
      const s = new Slider(div());
      should.not.exist(s.discreteValues());
    });

    it('discreteValues: setter/getter works', () => {
      const s = new Slider(div());
      should.not.exist(s.discreteValues());
      s.discreteValues([1, 2, 3]).should.equal(s);
      s.discreteValues().should.eql([1, 2, 3]);
    });

    it('min: initial value is correct', () => {
      const s = new Slider(div());
      s.min().should.equal(0);
    });

    it('min: setter/getter works', () => {
      const s = new Slider(div());
      s.min().should.equal(0);
      s.min(0.5).should.equal(s);
      s.min().should.equal(0.5);
    });

    it('max: initial value is correct', () => {
      const s = new Slider(div());
      s.max().should.equal(1);
    });

    it('max: setter/getter works', () => {
      const s = new Slider(div());
      s.max().should.equal(1);
      s.max(0.5).should.equal(s);
      s.max().should.equal(0.5);
    });

    it('step: initial value is correct', () => {
      const s = new Slider(div());
      should.not.exist(s.step());
    });

    it('step: setter/getter works', () => {
      const s = new Slider(div());
      should.not.exist(s.step());
      s.step(0.5).should.equal(s);
      s.step().should.equal(0.5);
    });

    it('renderer: initial value is correct', () => {
      const s = new Slider(div());
      s.renderer().should.be.a('function');
    });

    it('renderer: setter/getter works', () => {
      function f() {}
      const s = new Slider(div());
      s.renderer().should.be.a('function');
      s.renderer(f).should.equal(s);
      s.renderer().should.equal(f);
    });
  });
};
