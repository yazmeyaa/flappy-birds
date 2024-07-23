export interface IObjectPool<T extends object> {
  allocate(): T;
  release(obj: T): void;
  reserve(x: number): void;
  limit(x: number): void;
}

export type NewObjFunc<T extends object> = () => T;