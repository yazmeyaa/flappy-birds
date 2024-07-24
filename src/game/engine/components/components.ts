import { Bitmap } from "bitmap-index";
import { NewObjFunc, ObjectPool } from "../object_pool";
import {
  AbstractBasicComponent,
  BasicComponent,
  IComponentsManager,
  IComponentStorage,
  Id,
} from "./types";

export class ComponentsManager implements IComponentsManager {
  private stores: Map<string, ComponentsStorage<any>> = new Map();

  public getStorage<C extends BasicComponent>(
    component:  AbstractBasicComponent
  ): IComponentStorage<C> {
    return this.stores.get(component.component_name) as IComponentStorage<C>;
  }

  public registerStorage<C extends BasicComponent>(
    component: typeof BasicComponent,
    newFunc: NewObjFunc<C>
  ): void {
    const name = component.component_name;
    if (this.stores.has(name)) return;
    this.stores.set(name, new ComponentsStorage<C>(newFunc));
  }
}

export class ComponentsStorage<T extends BasicComponent>
  implements IComponentStorage<T>
{
  private pool: ObjectPool<T>;
  private components: Map<Id, T>;
  private _bitmap: Bitmap;
  constructor(newFunc: NewObjFunc<T>) {
    this._bitmap = new Bitmap(128);
    this.pool = new ObjectPool<T>({ newFunc });
    this.components = new Map<Id, T>();
  }

  public bitmap(): Bitmap {
    return this._bitmap;
  }

  public add(entityId: Id): T {
    if (this.components.has(entityId)) return this.components.get(entityId)!;
    const component = this.pool.allocate();
    this.components.set(entityId, component);
    this._bitmap.set(entityId);
    return component;
  }
  public has(id: Id): boolean {
    return this.components.has(id);
  }
  public remove(id: Id): void {
    if (!this.components.has(id)) return;
    const component = this.components.get(id)!;
    this.pool.release(component);
    this.components.delete(id);
    this._bitmap.remove(id);
  }
  get(entityId: Id): T | null {
    if (!this.components.has(entityId)) return null;
    return this.components.get(entityId)!;
  }
}
