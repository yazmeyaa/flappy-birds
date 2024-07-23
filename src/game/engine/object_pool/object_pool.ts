import { IObjectPool, NewObjFunc } from "./types";



type ObjectPoolConstructor<T extends object> = {
  newFunc: NewObjFunc<T>;
};

export class ObjectPool<T extends object> implements IObjectPool<T> {
  private newFunc: NewObjFunc<T>;
  private stack: T[];

  constructor(obj: ObjectPoolConstructor<T>) {
    this.newFunc = obj.newFunc;
    this.stack = new Array<T>(0);
  }

  public allocate(): T {
    const member = this.stack.pop();
    if (!member) return this.newFunc();
    else return member;
  }

  public release(obj: T): void {
    this.stack.push(obj);
  }

  public reserve(x: number): void {
    this.stack = new Array<T>(x);
    for (let i = 0; i < x; i++) {
      this.stack[i] = this.newFunc();
    }
  }

  public limit(x: number): void {
    while (this.stack.length !== x) {
      if (x < this.stack.length) {
        this.stack.pop();
      } else {
        this.stack.push(this.newFunc());
      }
    }
  }
}
