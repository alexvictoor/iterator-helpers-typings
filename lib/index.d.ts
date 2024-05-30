

interface LegacyIterator<T, TReturn = any, TNext = undefined> {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}

type IteratorStaticType = {
    from: <T, TReturn = any, TNext = undefined>(input: Iterable<T> | Iterator<T, TReturn, TNext> | LegacyIterator<T, TReturn, TNext>) => Iterator<T, TReturn, TNext>
}


interface Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>; // this is cheating but otherwise spread... does not work
    map: <U>(mapper: (input: T, index: number) => U) => Iterator<U>;
    filter: (mapper: (input: T, index: number) => boolean) => Iterator<T>;
    take: (limit: number) => Iterator<T>;
    drop: (limit: number) => Iterator<T>;
    flatMap: <U, UReturn = any, UNext = undefined>(mapper: (input: T, index: number) => Iterable<U> | Iterator<U, UReturn, UNext>) => Iterator<U, UReturn, UNext>;
    some: (predicate: (input: T, index: number) => boolean) => boolean;
    every: (predicate: (input: T, index: number) => boolean) => boolean;
    reduce: <U>(reducer: (accumulator: U, value: T, counter: number) => U, initialValue?: U) => U;
    find: (predicate: (input: T, index: number) => boolean) => T | undefined;
    forEach: (fn: (value: T, counter: number) => void) => void;
    toArray: () => Array<T>;    
}

declare const Iterator: IteratorStaticType;