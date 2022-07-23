"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * # Iter
 *
 * Iter is a class implements utility methods for generator objects, such as
 * map, filter, reduce and more.
 */
class Iter {
    constructor(factory) {
        this.factory = factory;
    }
    /**
     * # Iter.map
     *
     * Exposes a mapping interface to a `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).map(x => x * 2) // Iter<number> { ... }
     *
     * @param predicate A predicate function to map over the `Iter` entry.
     * @returns A new `Iter` containing the mapped entries of the original `Iter`.
     */
    map(predicate) {
        const context = this;
        const generator = function* () {
            for (const item of context.factory()) {
                yield predicate(item);
            }
        };
        return new Iter(generator);
    }
    /**
     * # Iter.forEach
     *
     * Utility method to iterate over an `Iter` object.
     *
     * @example
     *
     * Iter.range(0, 4).forEach(item => console.log(item))
     *
     * @param callback A callback function execute over each entry of the `Iter` object.
     */
    forEach(callback) {
        for (const item of this.factory()) {
            callback(item);
        }
    }
    /**
     * # Iter.filter
     *
     * Exposes a filtering interface to a `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).filter(x => x % 2 === 0) // Iter<number> { ... }
     *
     * @param predicate A predicate function to filter the `Iter` entry.
     * @returns A new `Iter` containing the filtered entries of the original `Iter`.
     */
    filter(predicate) {
        const context = this;
        const factory = function* () {
            for (const item of context.factory()) {
                if (predicate(item)) {
                    yield item;
                }
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.take
     *
     * Utility method to take a number of items from an `Iter` object.
     *
     * @example
     *
     * Iter.range(1, Infinity).take(5) // Iter<number> { ... }
     *
     * @param count Number of items to take from the `Iter` object.
     * @returns A new `Iter` containing the taken items.
     */
    take(count) {
        const context = this;
        const factory = function* () {
            let i = 0;
            for (const item of context.factory()) {
                if (i >= count) {
                    break;
                }
                i++;
                yield item;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.reduce
     *
     * Utility method to reduce an `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).reduce((total, item) => total + item, 0) // Number { 55 }
     *
     * @param reducer A reducer function to reduce the `Iter` entry.
     * @param initial The initial value to start the reduction.
     * @returns The reduced value.
     */
    reduce(reducer, initial) {
        let acc = initial;
        for (const item of this.factory()) {
            acc = reducer(acc, item);
        }
        return acc;
    }
    /**
     * # Iter.pairwise
     *
     * Utility method to pairwise an `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).pairwise() // Iter<[number, number]> { ... }
     *
     * @returns A new `Iter` containing the entries of the original `Iter` grouped
     * in pairs.
     */
    pairwise() {
        const context = this;
        const factory = function* () {
            let arr = [];
            for (const item of context.factory()) {
                arr.push(item);
                if (arr.length == 2) {
                    yield structuredClone(arr);
                    arr.splice(0, 1);
                }
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.enumerate
     *
     * Utility method to enumerate an `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).enumerate() // Iter<[number, number]> { ... }
     *
     * @returns A new `Iter` containing the entries of the original `Iter`
     */
    enumerate() {
        const context = this;
        const factory = function* () {
            let i = 0;
            for (const item of context.factory()) {
                yield [i, item];
                i++;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.fold
     *
     * Utility method to fold an `Iter` object.
     *
     * @example
     *
     * Iter.range(0, 4).fold(0, (total, item) => total + item) // number { 6 }
     *
     * @param initial The initial value to start folding .
     * @param predicate A predicate function to fold the `Iter` entry.
     * @returns A folded value from the `Iter` object.
     */
    fold(initial, predicate) {
        let acc = initial;
        for (const item of this.factory()) {
            acc = predicate(acc, item);
        }
        return acc;
    }
    /**
     * # Iter.scan
     *
     * @example
     *
     * Iter.range(1, 10).scan((total, item) => total + item, 0) // Iter<number> { ... }
     *
     * @param scanner A scanner function to scan the `Iter` entry.
     * @param initial The initial value to start the scan.
     * @returns An iterator containing the scanned values.
     */
    scan(scanner, initial) {
        const context = this;
        const factory = function* () {
            let val = initial;
            for (const item of context.factory()) {
                val = scanner(val, item);
                yield val;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.partition
     *
     * Utility method to partition an `Iter` object.
     *
     * @example
     *
     * const [even, odd] = Iter.range(1, 10).partition(x => x % 2 === 0) // [Iter<number>, Iter<number>]
     *
     * @param partitionFn A function to partition the `Iter` entry.
     * @returns A tuple containing the partitioned `Iter` objects.
     */
    partition(partitionFn) {
        const context = this;
        const truthy = function* () {
            for (const item of context.factory()) {
                if (partitionFn(item)) {
                    yield item;
                }
            }
        };
        const falsy = function* () {
            for (const item of context.factory()) {
                if (!partitionFn(item)) {
                    yield item;
                }
            }
        };
        return [new Iter(truthy), new Iter(falsy)];
    }
    /**
     * # Iter.collect
     *
     * Utility method to collect an `Iter` object to an array.
     *
     * @example
     *
     * Iter.range(0, 4).collect() // number[] [0, 1, 2, 3]
     *
     * @returns A collected array of the entries of the `Iter` object.
     */
    collect() {
        return [...this.factory()];
    }
    /**
     * # Iter.inspect
     *
     * Utility method to inspect the entries of an `Iter` object.
     *
     * @example
     *
     * Iter.range(1, 10).inspect(console.log) // Iter<number> { ... }
     *
     * @param inspector A function to inspect every entry of the `Iter` object.
     * @returns A new `Iter` with the entries of the original `Iter`.
     */
    inspect(inspector) {
        const context = this;
        const factory = function* () {
            for (const item of context.factory()) {
                inspector(item);
                yield item;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.every
     *
     * Utility method to check if every entry of an `Iter` object matches a predicate.
     *
     * @example
     *
     * Iter.range(0, 5).every(x => x < 10 === 0) // true
     *
     * @param predicate A predicate function to filter the `Iter` entry.
     * @returns A boolean value indicating weather every entry matches the predicate.
     */
    every(predicate) {
        for (const item of this.factory()) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }
    /**
     * # Iter.some
     *
     * Utility method to check if some entry of an `Iter` object matches a predicate.
     *
     * @example
     *
     * Iter.range(0, 5).some(x => x % 2 === 0) // true
     *
     * @param predicate Predicate function to filter the `Iter` entry.
     * @returns A boolean value indicating if any of the entries matches the predicate.
     */
    some(predicate) {
        for (const item of this.factory()) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
    [Symbol.iterator]() {
        return this.factory();
    }
    /**
     * # Iter.fromArray
     *
     * Utility method to create an `Iter` object from an array.
     *
     * @example
     *
     * Iter.fromArray([1, 2, 3]) // Iter<number> { ... }
     *
     * @param source Source array to turn into an `Iter` object
     * @returns A new `Iter` object.
     */
    static fromArray(source) {
        const factory = function* () {
            for (let i = 0; i < source.length; i++) {
                yield source[i];
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.range
     *
     * Utility method to create an `Iter` object from a range.
     *
     * @example
     *
     * Iter.range(1, 10) // Iter<number> { ... }
     *
     * @param start Start value of the range
     * @param end End value of the range
     * @returns A new `Iter` object.
     */
    static range(start, end) {
        const factory = function* () {
            const isAsc = start < end;
            if (isAsc) {
                for (let i = start; i < end; i++) {
                    yield i;
                }
                return;
            }
            for (let i = start; i > end; i--) {
                yield i;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.fromIterable
     *
     * Utility method to create an `Iter` object from an iterable.
     *
     * @example
     *
     * Iter.fromIterable('What?') // Iter<string> { ... }
     *
     * @param source Source iterable to turn into an `Iter` object
     * @returns A new `Iter` object.
     */
    static fromIterable(source) {
        const factory = function* () {
            for (const item of source) {
                yield item;
            }
        };
        return new Iter(factory);
    }
    /**
     * # Iter.fromGenerator
     *
     * Utility method to create an `Iter` object from a generator.
     *
     * @example
     *
     * const generator = function* () {
     *  yield 1
     * }
     *
     * Iter.fromGenerator(generator) // Iter<number> { ... }
     *
     * @param factory A factory function to create an `Iter` object.
     * @returns A new `Iter` object.
     */
    static fromGenerator(factory) {
        return new Iter(factory);
    }
    /**
     * # Iter.repeat
     *
     * Utility method to create an `Iter` object with `n` repetitions of a given item.
     *
     * @example
     *
     * Iter.repeat(1, 5) // Iter<number> { ... }
     *
     * @param item Item to repeat in the `Iter` object.
     * @param repetitions Number of repetitions of the item.
     * @returns A new `Iter` object.
     */
    static repeat(item, repetitions) {
        const factory = function* () {
            for (let i = 0; i < repetitions; i++) {
                yield item;
            }
        };
        return new Iter(factory);
    }
}
exports.default = Iter;
