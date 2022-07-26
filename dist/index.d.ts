/**
 * # Iter
 *
 * Iter is a class implements utility methods for generator objects, such as
 * map, filter, reduce and more.
 */
export default class Iter<A> {
    private factory;
    private constructor();
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
    map<B>(predicate: (item: A) => B): Iter<B>;
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
    forEach(callback: (item: A) => void): void;
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
    filter(predicate: (item: A) => boolean): Iter<A>;
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
    take(count: number): Iter<A>;
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
    reduce<B>(reducer: (reduced: B, item: A) => B, initial: B): B;
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
    pairwise(): Iter<[A, A]>;
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
    enumerate(): Iter<[number, A]>;
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
    fold<B>(initial: B, predicate: (acc: B, item: A) => B): B;
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
    scan<B>(scanner: (scan: B, item: A) => B, initial: B): Iter<B>;
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
    partition(partitionFn: (item: A) => boolean): [Iter<A>, Iter<A>];
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
    collect(): A[];
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
    inspect(inspector: (item: A) => void): Iter<A>;
    /**
     * # Iter.all
     *
     * Utility method to check if all of the entries of an `Iter` object matches a predicate.
     *
     * @example
     *
     * Iter.range(0, 5).all(x => x < 10 === 0) // true
     *
     * @param predicate A predicate function to filter the `Iter` entry.
     * @returns A boolean value indicating weather all entries matches the predicate.
     */
    all(predicate: (item: A) => boolean): boolean;
    /**
     * # Iter.any
     *
     * Utility method to check if any entry of an `Iter` object matches a predicate.
     *
     * @example
     *
     * Iter.range(0, 5).any(x => x % 2 === 0) // true
     *
     * @param predicate Predicate function to filter the `Iter` entry.
     * @returns A boolean value indicating if any of the entries matches the predicate.
     */
    any(predicate: (item: A) => boolean): boolean;
    /**
     * # Iter.reject
     *
     * Utility method to reject any entry that doesn't match the predicate function.
     *
     * @example
     *
     * Iter.range(0, 5).reject(x => x % 2 === 0) // Iter<number> { ... }
     *
     * @param predicate A predicate function to filter the `Iter` entry.
     * @returns An `Iter` that yields the values that didn't match the predicate
     * function.
     */
    reject(predicate: (item: A) => boolean): Iter<A>;
    /**
     * # Iter[Symbol.iterator]
     *
     * Utility method to iterate over an `Iter` object.
     *
     * @example
     *
     * for (const item of Iter.range(0, 5)) {
     *  // ...
     * }
     *
     * @returns A generator object that can be used to iterate over the entries of the `Iter` object.
     */
    [Symbol.iterator](): Generator<A, any, unknown>;
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
    static fromArray<T>(source: T[]): Iter<T>;
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
     * @param interval Optional interval of every step in the range
     * @returns A new `Iter` object.
     */
    static range(start: number, end: number, interval?: number): Iter<number>;
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
    static fromIterable<A>(source: Iterable<A>): Iter<A>;
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
    static fromGenerator<A>(factory: () => Generator<A>): Iter<A>;
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
    static repeat<T>(item: T, repetitions: number): Iter<T>;
}
