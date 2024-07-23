import { Bitmap } from "bitmap-index";
import { NewObjFunc } from "../object_pool/object_pool";

export type Id = number;

export interface IComponentsManager {
  getStorage<C extends BasicComponent>(
    component: typeof BasicComponent
  ): IComponentStorage<C>;
  registerStorage<C extends BasicComponent>(
    component: typeof BasicComponent,
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
