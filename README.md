# iterator-helpers-typings
TypeScript typings for [TC39 iterator helpers proposal](https://github.com/tc39/proposal-iterator-helpers), already implemented by V8 and available with Chrome and Node 22+  
As of May 2024, this TC39 proposal is on stage 3 but has not been yet integrated to TypeScript. This might be related to some [breaking changes](https://github.com/microsoft/TypeScript/issues/54481)...
Anyway if you want to start using with TypeScript this awesome functional API bringing lazy sequences, first install the typings with npm or yarn as follow:

```bash
npm install -D iterator-helpers-typings
```

Then, anywhere in your TypeScript codebase, you need to import the typings:

```typescript
import 'iterator-helpers-typings';

```

Once this is done you will be able to use iterators in a functionnal way \o/

```typescript
Iterator
  .from('Hello world iterators!')
  .flatMap(x => [x, ' '])
  .toArray()
  .join('')
// 'H e l l o   w o r l d   i t e r a t o r s ! '
```
You may think the example above is not mindblowing... 
Fair enough, now if you try to combine generators with iterator helpers, you have at your disposal lazy infinite sequences!
Below as an example an implementation of the [Sieve of Eratosthenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) leveraging on generators and itrator helpers:

```typescript
function *generateNaturals(n: number) {
    yield n;
    yield* generateNaturals(n + 1);
 }

 const naturals = generateNaturals(2);


 function *sieve(seq: Iterator<number>) {
    const prime = seq.next().value;
    yield prime;
    yield* sieve(seq.filter(n => n % prime !== 0));
 }

 const primes = sieve(naturals);

 // Log the 10 first prime numbers greater than 42
console.log(
  primes
    .filter(p => p > 42)
    .take(10)
    .toArray()
);
```

