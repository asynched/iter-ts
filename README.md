# iter-ts

Iterables with methods for JavaScript/Typescript! 🎉

## About

This library aims to implement utility methods for iterable objects in Javascript/Typescript. As you'll see in the docs, an `Iter` object can be created from pretty much anything that exposes an iterable interface.

## Installation

First, you've gotta install the library with:

- npm

```sh
npm i iter-ts
```

- yarn

```sh
yarn add iter-ts
```

> You're now ready to use iter-ts! 🥳

## The gist

Imagine you need to iterate over something, that might be an `Array` of some sorts or a `generator` function and need to do some operations on that iterable. In the case below, we'll be iterating over a Fibonacci generator function and operating over each entry.

```ts
import Iter from 'iter-ts'

// This is our generator function.
// In here, we can request as many
// terms as we'd like.
function* fibonacci(terms: number) {
  let n1 = 1
  let n2 = 1
  let nextTerm: number

  for (let i = 1; i <= n; i++) {
    yield n1
    nextTerm = n1 + n2
    n1 = n2
    n2 = nextTerm
  }
}

// First, we're going to build an Iter
// object from the generator function.
// We'll do that by using the method
// `.fromGenerator` on the Iter class.
const values = Iter
  // In here, we'll make a generator with
  // an infinite number of terms.
  // And yes, we can do that without killing the CPU!
  .fromGenerator(() => fibonacci(Infinity))
  // We'll take the first 10 terms from the sequence.
  .take(10)
  // We'll inspect each term.. Because debugging!
  .inspect((term) => console.log(term))
  // After inspecting the terms, we'll double each one.
  .map((term) => term * 2)
  // We'll filter them, taking only the even numbers.
  .filter((term) => term % 2 === 0)
  // And we'll collect then into an array of numbers.
  .collect()

// Now we have a list of values from our
// generator function.
console.log(values)
```

- But why does it even work? Wasn't the `fibonacci` function called with `Infinity`?

Yes, indeed. The generator function was called with `Infinity` as a parameter, **but...** Javascript generators are lazy, as the terms will only be evaluated as the generator is called. This allows us to call the `fibonacci` generator with as many terms as we want without killing the Javascript runtime, as they'll only be evaluated when a term from the generator is requested.

In the example above, the generator is only requested on the `.collect()` method call, since we only want to take 10 items out of the generator, the Javascript runtime is smart enough to yield us only 10 entries, of which we perform operations later.

> Cool, isn't it?

This pattern doesn't only apply to numbers, as we can make an `Iter` object out of anything that exposes an `Iterable` interface.

## Before proceeding further

Iterables are really cool, and being able to perform operations on them is really nice, **BUT...** Operating over them in this pattern hinders us a perform penalty. Iter methods are not as performant as `Array` operations, comparing the speed between the two, we found the results:

- 10.000 entries

| Object | Runtime |
| ------ | ------- |
| Array  | 0ms     |
| Iter   | 4ms     |

- 100.000 entries

| Object | Runtime |
| ------ | ------- |
| Array  | 4ms     |
| Iter   | 14ms    |

- 1.000.000 entries

| Object | Runtime |
| ------ | ------- |
| Array  | 22ms    |
| Iter   | 96ms    |

> Mapping over `n` entries of an `Array` / `Iter`, doubling the value of each entry.

So, why should I use this if it is clearly slower than the array alternative?

- Although arrays are much faster than the iter alternative, they use much more memory;
- Performing operations on a big array might result in an exception in different runtimes, as the process will take too much memory;
- Array operations aren't lazy, they'll execute as long as you tell the computer to do it.

As operating over `Iter` objects is lazy by default, you get the benefits:

- Much less memory consumption, as the value can be dropped after an iteration of the `Iter`;
- Nicer iteration utilities, such as `take`, `fold`, `scan` and others;
- You can still use arrays, as collecting an `Iter` will give you an array of the entries from your iterable;
- Iters can be built from anything that is iterable, such as `strings`, `ranges` and `generators`.

## Author

| ![Eder Lima](https://github.com/asynched.png?size=100) |
| ------------------------------------------------------ |
| [Eder Lima](https://github.com/asynched)               |
