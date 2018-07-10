import chai from 'chai'

import { List } from 'utils/list'

export default () => {
  const should = chai.should()

  describe('list', () => {
    it('contains nothing when initialsed', () => {
      const list = new List()
      list.entries().should.eql([])
    })

    it('size should be reported as 0 for a newly initialsed list', () => {
      const list = new List()
      list.size.should.equal(0)
    })

    it('contains stuff when initialsed with a non empty array', () => {
      const list = new List([2, 3, 1])
      list.entries().should.eql([2, 3, 1])
    })

    it('size should be reported as non-zero for a list initialsed with a non empty array', () => {
      const list = new List([2, 3, 1])
      list.size.should.equal(3)
    })

    it('add should work', () => {
      const list = new List()
      list.add(2)
      list.add(4)
      list.add(7)
      list.entries().should.eql([2, 4, 7])
      list.size.should.equal(3)
    })

    it('clear should work', () => {
      const list = new List([8, 7, 6, 5])
      list.clear()
      list.entries().should.eql([])
      list.size.should.equal(0)
    })

    it('delete should work', () => {
      const list = new List([8, 7, 6, 5])
      list.delete(2)
      list.entries().should.eql([8, 7, 5])
      list.size.should.equal(3)
    })

    it('delete out of range should do nothing', () => {
      const list = new List([8, 7, 6, 5])
      list.delete(20000)
      list.entries().should.eql([8, 7, 6, 5])
      list.size.should.equal(4)
    })

    it('forEach should work', () => {
      const list = new List([3, 3, 2, 1, 3])
      const items = []
      list.forEach(d => items.push(d))
      return items.should.eql([3, 3, 2, 1, 3])
    })

    it('forEach should work with a different this', () => {
      const list = new List([3, 3, 2, 1, 3])
      const items = []
      list.forEach(function (d) { return this.push(d) }, items)
      return items.should.eql([3, 3, 2, 1, 3])
    })

    it('get should work', () => {
      const list = new List([3, 3, 2, 1, 3])
      list.get(0).should.equal(3)
      list.get(2).should.equal(2)
      list.get(4).should.equal(3)
    })

    it('get should return undefined when out of bounds', () => {
      const list = new List([3, 3, 2, 1, 3])
      should.not.exist(list.get(-1))
      should.not.exist(list.get(5))
      return should.not.exist(list.get(NaN))
    })

    it('has should work', () => {
      const list = new List([3, 3, 2, 1, 3])
      list.has(-1).should.equal(false)
      list.has(0).should.equal(false)
      list.has(1).should.equal(true)
      list.has(2).should.equal(true)
      list.has(3).should.equal(true)
      list.has(4).should.equal(false)
      list.has(5).should.equal(false)
      list.has(NaN).should.equal(false)
    })

    it('remove should work', () => {
      const list = new List([3, 3, 2, 1, 3])
      list.remove(3)
      list.entries().should.eql([3, 2, 1, 3])
      list.size.should.equal(4)
    })

    it('removeAll should work', () => {
      const list = new List([3, 3, 2, 1, 3])
      list.removeAll(3)
      list.entries().should.eql([2, 1])
      list.size.should.equal(2)
    })

    it("remove should do nothing when it can't find any matching value", () => {
      const list = new List([3, 3, 2, 1, 3])
      list.remove(4)
      list.entries().should.eql([3, 3, 2, 1, 3])
      list.size.should.equal(5)
    })

    it("removeAll should do nothing when it can't find any matching value", () => {
      const list = new List([3, 3, 2, 1, 3])
      list.removeAll(4)
      list.entries().should.eql([3, 3, 2, 1, 3])
      list.size.should.equal(5)
    })

    it('values should return the same as entries', () => {
      const list = new List([3, 2, 1])
      list.values().should.equal(list.entries())
      list.values().should.eql([3, 2, 1])
    })

    it('size should be correct after adding and removing several items', () => {
      const list = new List()
      list.size.should.equal(0)
      list.add(42)
      list.size.should.equal(1)
      list.add(43)
      list.size.should.equal(2)
      list.add(44)
      list.size.should.equal(3)
      list.add(45)
      list.size.should.equal(4)
      list.delete(0)
      list.size.should.equal(3)
      list.remove(44)
      list.size.should.equal(2)
      list.delete(-1)
      list.size.should.equal(2)
      list.remove(44)
      list.size.should.equal(2)
      list.clear()
      list.size.should.equal(0)
    })
  })
}
