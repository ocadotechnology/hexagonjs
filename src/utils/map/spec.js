import chai from 'chai';

import { Map } from 'utils/map';

export default () => {
  const should = chai.should();

  describe('map', () => {
    const array = [1];

    it('Map::size should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Lazlo'], [array, 'Ganesh']]);
      map.size.should.equal(3);
    });

    it('Map::get should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Lazlo'], [array, 'Ganesh']]);
      map.get(1).should.equal('Bob');
      map.get('1').should.equal('Lazlo');
      map.get(array).should.equal('Ganesh');
    });

    it('Map::delete should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Lazlo'], [array, 'Ganesh']]);
      map.size.should.equal(3);
      map.delete(1);
      map.size.should.equal(2);
      map.entries().should.eql([['1', 'Lazlo'], [array, 'Ganesh']]);
    });

    it('Map::get should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Lazlo'], [array, 'Ganesh']]);
      map.get(1).should.equal('Bob');
      map.get('1').should.equal('Lazlo');
      map.get(array).should.equal('Ganesh');
    });

    it('Map::delete should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Lazlo'], [array, 'Ganesh']]);
      map.delete(1);
      map.size.should.equal(2);
      map.entries().should.eql([['1', 'Lazlo'], [array, 'Ganesh']]);
      map.delete(array);
      map.size.should.equal(1);
      map.entries().should.eql([['1', 'Lazlo']]);
    });

    it('Map::set should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], ['1', 'Ganesh']]);
      map.set(1, 'Lazlo');
      map.entries().should.eql([[1, 'Lazlo'], ['1', 'Ganesh']]);
    });

    it('Map::has should distinguish between keys with the same toString', () => {
      const map = new Map([[1, 'Bob'], [array, 'Ganesh']]);
      map.has(1).should.equal(true);
      map.has('1').should.not.equal(true);
      map.has(array).should.equal(true);
    });

    it('contains nothing when initialsed', () => {
      const map = new Map();
      map.values().should.eql([]);
    });

    it('contains stuff when initialsed with an array', () => {
      const map = new Map([['key', 'value'], ['key2', 123]]);
      map.entries().should.eql([['key', 'value'], ['key2', 123]]);
    });

    it('Map::size should be reported as 0 for a newly initialsed map', () => {
      const map = new Map();
      map.size.should.equal(0);
    });

    it('Map::set should work', () => {
      const map = new Map();
      map.set('a', 5);
      map.set('b', 2);
      map.set('c', 7);
      map.entries().should.eql([['a', 5], ['b', 2], ['c', 7]]);
      map.size.should.equal(3);
    });

    it('Map::clear should work', () => {
      const map = new Map();
      [8, 7, 6, 5].forEach(d => map.set(`${d}`, d * 2));
      map.clear();
      map.values().should.eql([]);
      map.size.should.equal(0);
    });

    it('Map::get should return undefined for previously defined value after clear is called', () => {
      const map = new Map();
      map.set('a', 42);
      map.get('a').should.equal(42);
      map.clear();
      return should.not.exist(map.get('a'));
    });

    it('Map::delete should work', () => {
      const map = new Map();
      [8, 7, 6, 5].forEach(d => map.set(`${d}`, d * 2));
      map.delete('6');
      map.entries().should.eql([['8', 16], ['7', 14], ['5', 10]]);
      map.size.should.equal(3);
    });

    it('Map::delete for non existant entry should do nothing', () => {
      const map = new Map();
      [8, 7, 6, 5].forEach(d => map.set(`${d}`, d * 2));
      map.delete(20000);
      map.entries().should.eql([['8', 16], ['7', 14], ['6', 12], ['5', 10]]);
      map.size.should.equal(4);
    });

    it('Map::forEach should work', () => {
      const map = new Map();
      [3, 3, 2, 1, 3].forEach(d => map.set(`${d}`, d * 2));
      const keys = [];
      const values = [];
      map.forEach((k, v) => {
        keys.push(k);
        return values.push(v);
      });
      keys.should.eql(['3', '2', '1']);
      return values.should.eql([6, 4, 2]);
    });

    it('Map::forEach should work with a different this', () => {
      const map = new Map();
      [3, 3, 2, 1, 3].forEach(d => map.set(`${d}`, d * 2));
      const keys = [];
      const values = [];
      map.forEach(k => this.push(k), keys);
      map.forEach((k, v) => this.push(v), values);
      keys.should.eql(['3', '2', '1']);
      return values.should.eql([6, 4, 2]);
    });

    it('Map::has should work', () => {
      const map = new Map();
      [3, 3, 2, 1, 3].forEach(d => map.set(`${d}`, d * 2));
      map.has('-1').should.equal(false);
      map.has('0').should.equal(false);
      map.has('1').should.equal(true);
      map.has('2').should.equal(true);
      map.has('3').should.equal(true);
      map.has('4').should.equal(false);
      map.has('5').should.equal(false);
      map.has('NaN').should.equal(false);
      map.has(NaN).should.equal(false);
      map.has(undefined).should.equal(false);
      map.has(null).should.equal(false);
      map.has(0).should.equal(false);
    });

    it('Map::entries should return the correct values', () => {
      const map = new Map();
      [3, 2, 1].forEach(d => map.set(`${d}`, d * 2));
      map.entries().should.eql([['3', 6], ['2', 4], ['1', 2]]);
    });

    it('Map::keys should return the correct values', () => {
      const map = new Map();
      [3, 2, 1].forEach(d => map.set(`${d}`, d * 2));
      map.keys().should.eql(['3', '2', '1']);
    });

    it('Map::size should be correct after adding and removing several items', () => {
      const map = new Map();
      map.size.should.equal(0);
      map.set('a', 42);
      map.size.should.equal(1);
      map.set('b', 43);
      map.size.should.equal(2);
      map.set('b', 42);
      map.size.should.equal(2);
      map.set('c', 44 * 2);
      map.size.should.equal(3);
      map.set('d', 45 * 2);
      map.size.should.equal(4);
      map.delete('a');
      map.size.should.equal(3);
      map.delete('a');
      map.size.should.equal(3);
      map.clear();
      map.size.should.equal(0);
    });

    it('overwriting keys should work', () => {
      const map = new Map();
      map.set('a', 1);
      map.get('a').should.equal(1);
      map.set('a', 2);
      map.get('a').should.equal(2);
    });

    it('using NaN as a key should work', () => {
      const map = new Map();
      map.set(NaN, 50);
      map.set('a', 54);
      map.get(NaN).should.equal(50);
      map.keys().should.eql(['a', NaN]);
      map.entries().should.eql([['a', 54], [NaN, 50]]);
    });

    it('using NaN should update the size correctly', () => {
      const map = new Map();
      map.set(NaN, 50);
      map.set(NaN, 50);
      map.set('a', 52);
      map.size.should.equal(2);
      map.delete(NaN);
      map.size.should.equal(1);
    });
  });
};
