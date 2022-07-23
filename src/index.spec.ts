import Iter from './index'

describe('Iter - Constructors', () => {
  describe('Iter.fromArray()', () => {
    it('should be able to generate an instance of a Iter', () => {
      const iter = Iter.fromArray([1, 2, 3])
      expect(iter).toBeInstanceOf(Iter)
    })

    it('should collect to the original array', () => {
      const result = Iter.fromArray([1, 2, 3]).collect()
      expect(result).toEqual([1, 2, 3])
    })
  })

  describe('Iter.fromGenerator()', () => {
    const generator = function* () {
      yield 1
      yield 2
      yield 3
    }

    it('should be able to generate an instance of a Iter', () => {
      const result = Iter.fromGenerator(generator)
      expect(result).toBeInstanceOf(Iter)
    })

    it('should collect to an array of [1, 2, 3]', () => {
      const result = Iter.fromGenerator(generator).collect()
      expect(result).toEqual([1, 2, 3])
    })
  })

  describe('Iter.fromIterable()', () => {
    it('should be able to generate an instance of a Iter', () => {
      const iter = Iter.fromIterable('123')

      expect(iter).toBeInstanceOf(Iter)
    })

    it('should be able to collect to an array', () => {
      const result = Iter.fromIterable('123').collect()
      expect(result).toEqual(['1', '2', '3'])
    })
  })

  describe('Iter.range()', () => {
    it('should be able to generate an instance of a Iter', () => {
      const iter = Iter.range(1, 3)
      expect(iter).toBeInstanceOf(Iter)
    })

    it('should collect to an array of [0, 1, 2]', () => {
      const result = Iter.range(0, 3).collect()
      expect(result).toEqual([0, 1, 2])
    })

    it('should be able to generate a range from positive to negative interval', () => {
      const result = Iter.range(0, -4).collect()
      expect(result).toEqual([0, -1, -2, -3])
    })
  })

  describe('Iter.repeat()', () => {
    it('should be able to generate an instance of a Iter', () => {
      const iter = Iter.repeat(1, 10)
      expect(iter).toBeInstanceOf(Iter)
    })

    it('should collect to an array of [1, 1, 1, ..., 1]', () => {
      const result = Iter.repeat(1, 10).collect()
      expect(result).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })
})

describe('Iter - Methods', () => {
  describe('Iter.map()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.fromArray([1, 2, 3])
    })

    it('should duplicate the values of each entry', () => {
      const result = iter.map((x) => x * 2).collect()
      expect(result).toEqual([2, 4, 6])
    })

    it('should turn every element to zero', () => {
      const result = iter.map(() => 0).collect()
      expect(result).toEqual([0, 0, 0])
    })

    it('should turn every element into a char', () => {
      const result = iter.map((x) => String.fromCharCode(x + 64)).collect()
      expect(result).toEqual(['A', 'B', 'C'])
    })
  })

  describe('Iter.filter()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.fromArray([1, 2, 3])
    })

    it('should filter out all odd numbers', () => {
      const result = iter.filter((x) => x % 2 === 0).collect()
      expect(result).toEqual([2])
    })

    it('should filter out all even numbers', () => {
      const result = iter.filter((x) => x % 2 !== 0).collect()
      expect(result).toEqual([1, 3])
    })
  })

  describe('Iter.reduce()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.fromArray([1, 2, 3])
    })

    it('should sum all numbers', () => {
      const result = iter.reduce((x, y) => x + y, 0)
      expect(result).toEqual(6)
    })

    it('should sum all numbers including the initial argument for the reducer', () => {
      const result = iter.reduce((x, y) => x + y, 10)
      expect(result).toEqual(16)
    })
  })

  describe('Iter.take()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, Infinity)
    })

    it('should take only the first 5 elements', () => {
      const result = iter.take(5).collect()
      expect(result).toEqual([0, 1, 2, 3, 4])
    })

    it('should take only 2 elements after it has been filtered', () => {
      const result = Iter.range(0, 4)
        .filter((x) => x % 2 === 0)
        .take(2)
        .collect()

      expect(result).toEqual([0, 2])
    })
  })

  describe('Iter.pairwise()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 5)
    })

    it('should return an array of pairs', () => {
      const result = iter.pairwise().collect()
      expect(result).toEqual([
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ])
    })

    it('should return an array of pairs of strings', () => {
      const result = Iter.fromIterable('abc').pairwise().collect()

      expect(result).toEqual([
        ['a', 'b'],
        ['b', 'c'],
      ])
    })
  })

  describe('Iter.enumerate()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 5)
    })

    it("should return an array of pairs containing the item and it's index", () => {
      const result = iter.enumerate().collect()
      expect(result).toEqual([
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ])
    })

    it("should return an array of pairs containing the item and it's index", () => {
      const result = Iter.fromIterable('abc').enumerate().collect()
      expect(result).toEqual([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
      ])
    })
  })

  describe('Iter.fold()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.fromArray([1, 2, 3])
    })

    it('should sum all numbers', () => {
      const result = iter.fold(0, (x, y) => x + y)
      expect(result).toEqual(6)
    })

    it('should sum all numbers including the initial argument for the fold', () => {
      const result = iter.fold(10, (x, y) => x + y)
      expect(result).toEqual(16)
    })
  })

  describe('Iter.scan()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.fromArray([1, 2, 3])
    })

    it('should sum all numbers', () => {
      const result = iter.scan((x, y) => x + y, 0).collect()
      expect(result).toEqual([1, 3, 6])
    })

    it('should sum all numbers including the initial argument for the scan', () => {
      const result = iter.scan((x, y) => x + y, 10).collect()
      expect(result).toEqual([11, 13, 16])
    })
  })

  describe('Iter.partition()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 5)
    })

    it('should partition the iterable into two parts', () => {
      const [evens, odds] = iter.partition((x) => x % 2 === 0)
      expect(evens.collect()).toEqual([0, 2, 4])
      expect(odds.collect()).toEqual([1, 3])
    })

    it('should partition the iterable into two parts and both should be an instance of Iter', () => {
      const [evens, odds] = iter.partition((x) => x % 2 === 0)
      expect(evens).toBeInstanceOf(Iter)
      expect(odds).toBeInstanceOf(Iter)
    })
  })

  describe('Iter.collect()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should collect all elements', () => {
      const result = iter.collect()
      expect(result).toEqual([0, 1, 2, 3])
    })

    it('should collect all mapped elements', () => {
      const result = iter.map((x) => x * 2).collect()
      expect(result).toEqual([0, 2, 4, 6])
    })

    it('should collect all filtered elements', () => {
      const result = iter.filter((x) => x % 2 === 0).collect()
      expect(result).toEqual([0, 2])
    })
  })

  describe('Iter.inspect()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it("should not call the inspector function it hasn't been evaluated", () => {
      const inspector = jest.fn()
      iter.inspect(inspector)
      expect(inspector).not.toHaveBeenCalled()
    })

    it('should call the inspector function when evaluated', () => {
      const spy = jest.fn()
      iter.inspect(spy).collect()
      expect(spy).toHaveBeenCalled()
    })

    it('should return an Iter that collects to the original iterable', () => {
      const result = iter.inspect((x) => x).collect()
      expect(result).toEqual([0, 1, 2, 3])
    })
  })

  describe('Iter.all()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should return true if all elements match the predicate', () => {
      const result = iter.all((x) => x % 2 === 0)
      expect(result).toBe(false)
    })

    it('should return false if any elements do not match the predicate', () => {
      const result = iter.all((x) => x < 10)
      expect(result).toBe(true)
    })
  })

  describe('Iter.any()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should return true if any of the elements match the predicate', () => {
      const result = iter.any((x) => x % 2 === 0)
      expect(result).toBe(true)
    })

    it('should return false if none of the elements match the predicate', () => {
      const result = iter.any((x) => x > 10)
      expect(result).toBe(false)
    })
  })

  describe('Iter.forEach()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should call the callback for each element', () => {
      const spy = jest.fn()
      iter.forEach(spy)
      expect(spy).toHaveBeenCalledTimes(4)
    })

    it('should call the callback with the element and its index', () => {
      const spy = jest.fn()
      iter.forEach(spy)
      expect(spy).toHaveBeenNthCalledWith(1, 0)
      expect(spy).toHaveBeenNthCalledWith(2, 1)
      expect(spy).toHaveBeenNthCalledWith(3, 2)
      expect(spy).toHaveBeenNthCalledWith(4, 3)
    })
  })

  describe('Iter.reject()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should return an Iter that filters out all elements that match the predicate', () => {
      const result = iter.reject((x) => x % 2 === 0).collect()
      expect(result).toEqual([1, 3])
    })
  })

  describe('Iter[Symbol.iterator]()', () => {
    let iter: Iter<number>

    beforeEach(() => {
      iter = Iter.range(0, 4)
    })

    it('should return an iterator', () => {
      const spy = jest.fn()
      const result = iter[Symbol.iterator]()

      for (const _ of result) {
        spy()
      }

      expect(spy).toHaveBeenCalledTimes(4)
    })

    it('should return an iterator that iterates over the iterable', () => {
      const result = iter[Symbol.iterator]()
      expect(result.next()).toEqual({ value: 0, done: false })
      expect(result.next()).toEqual({ value: 1, done: false })
      expect(result.next()).toEqual({ value: 2, done: false })
      expect(result.next()).toEqual({ value: 3, done: false })
      expect(result.next()).toEqual({ value: undefined, done: true })
    })
  })
})
