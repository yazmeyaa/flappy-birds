import { Bitmap } from "bitmap-index";
import { NewObjFunc } from "../object_pool";

export type Id = number;

export interface AbstractBasicComponent {
  component_name: string;
}

export interface IComponentsManager {
  getStorage<C extends BasicComponent>(
    component: AbstractBasicComponent
  ): IComponentStorage<C>;
  registerStorage<C extends BasicComponent>(
    component: AbstractBasicComponent,
    newFunc: NewObjFunc<C>
  ): void;
}
export interface IComponentStorage<C extends BasicComponent> {
  add(entity: Id): C;
  get(entityId: Id): C | null;
  has(id: Id): boolean;
  remove(id: Id): void;
  bitmap(): Bitmap;
}

export abstract class BasicComponent {
  static component_name: string;
}
