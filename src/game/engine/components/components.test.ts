import { ComponentsManager } from "./components";
import { BasicComponent } from "./types";

class TestObject extends BasicComponent {
  public component_name = "test";
  public static component_name = "test";
  name: string = "";
  age: number = 0;

  constructor() {
    super();
  }
}

class TestObject2 extends BasicComponent {
  public component_name = "test2";
  public static component_name = "test2";
  surname: string = "";

  constructor() {
    super();
  }
}

describe("Game Components", () => {
  test("General", () => {
    const manager = new ComponentsManager();
    manager.registerStorage(
      TestObject,
      () => new TestObject()
    );
    manager.registerStorage(
      TestObject2,
      () => new TestObject2()
    );

    const store = manager.getStorage<TestObject>(TestObject);
    const store2 = manager.getStorage<TestObject2>(TestObject2);
    expect(store.has(1)).toBe(false);
    const obj = store.add(1);
    const obj2 = store2.add(1);

    expect(store.has(1)).toBe(true);
    expect(store2.has(1)).toBe(true);
    obj.age = 24;
    obj.name = "eugene";
    obj2.surname = "zxc";

    expect(obj2.surname).toBe("zxc");

    store.remove(1);
    expect(store.has(1)).toBe(false);
  });
});
