import { describe, it, expectTypeOf, expect } from "vitest";

describe("Iterators (with V8 released after April 2024)", () => {
  it("should have a static factory method", () => {
    expectTypeOf(Iterator.from([1,2,3])).toEqualTypeOf<Iterator<number>>()
  });

  it("should be mapable", () => {
    const it = Iterator.from([1,2,3]).map(x => x * 10);
    expect([...it]).toEqual([10, 20, 30]);
  });
  it("should be filterable", () => {
    const it = Iterator.from([1,2,3]).filter(x => x % 2 === 1);
    expect([...it]).toEqual([1, 3]);
  });
  it("should be takeable", () => {
    const it = Iterator.from([1,2,3]).filter(x => x % 2 === 1).take(1);
    expect([...it]).toEqual([1]);
  });
  it("should be dropable", () => {
    const it = Iterator.from([1,2,3]).take(2).drop(1);
    expect([...it]).toEqual([2]);
  });
  it("should be flatable", () => {
    const it = Iterator.from([1,2,3]).flatMap(x => [x, 42]);
    expect([...it]).toEqual([1, 42, 2, 42, 3, 42]);
  });
  it("should have some", () => {
    const result = Iterator.from([1,2,3]).some(x => x % 2 === 1);
    expect(result).toBe(true);
  });
  it("should have every", () => {
    const result = Iterator.from([1,2,3]).every(x => x % 2 === 1);
    expect(result).toBe(false);
  });
  it("should be reducible", () => {
    const result = Iterator.from([1,2,3]).reduce<number>((x, y) => x + y);
    expect(result).toBe(6);
  });
  it("should be findable", () => {
    const result = Iterator.from([1,2,3]).find(x => x % 2 === 0);
    expect(result).toBe(2);
  });
  it("should have foreach", () => {
    let sideEffectArray: Array<number> = [];
    Iterator.from([1,2,3]).forEach(x => sideEffectArray.push(x));
    expect(sideEffectArray).toEqual([1, 2, 3]);
  });
  it("should have toArray", () => {
    expect(Iterator.from([1,2,3]).toArray()).toEqual([1, 2, 3]);
  });
 

});