import { ObjectPool } from "./object_pool";

class TestObject {
  name: string;
  age: number;

  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

describe("Test objects pool", () => {
  test("Create and reserve manipulations", () => {
    const pool = new ObjectPool<TestObject>({
      newFunc: () => new TestObject("", 0),
    });

    pool.reserve(20);
    const obj = pool.allocate();
    expect(obj).not.toBeNull();
    expect(obj).not.toBeUndefined();
    pool.limit(25);
    pool.limit(15);
    pool.limit(100);
  });
});
