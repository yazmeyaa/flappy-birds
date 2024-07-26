import { AbstractBasicComponent } from "../components/types";
import { IWorld } from "../world";

type Constructor = new (...args: any[]) => any;

class ComponentDecoratorElement {
  public propertyKey: string | symbol;
  public component: Constructor & AbstractBasicComponent;

  constructor(
    propertyKey: string | symbol,
    component: Constructor & AbstractBasicComponent
  ) {
    this.propertyKey = propertyKey;
    this.component = component;
  }
}

export class BaseEntity {
  public id!: number;
  public initiated: boolean = false;
  private static _components: Map<Function, ComponentDecoratorElement[]> =
    new Map();
  [key: string]: any;

  private throwStorageNotInitiated(storageName: string): Error {
    throw new Error(
      `Storage ${storageName} in world is not initiated. Use World.components.registerStorage(...) to fix issue.`
    );
  }

  public static getComponents(target: Function): ComponentDecoratorElement[] {
    return this._components.get(target) || [];
  }

  public init(world: IWorld): void {
    this.id = world.newId();

    const components = (this.constructor as typeof BaseEntity).getComponents(
      this.constructor
    );

    for (const element of components) {
      const storage = world.components.getStorage(element.component);
      if (!storage) {
        throw this.throwStorageNotInitiated(element.component.component_name);
      }
      const component = storage.add(this.id);
      this[element.propertyKey as string] = component;
    }

    this.initiated = true;
  }

  public destroy(world: IWorld): void {
    const components = (this.constructor as typeof BaseEntity).getComponents(
      this.constructor
    );

    for (const element of components) {
      const storage = world.components.getStorage(element.component);
      if (!storage) {
        throw this.throwStorageNotInitiated(element.component.component_name);
      }
      storage.remove(this.id);
    }

    this.initiated = false;
  }
}

export function Component(component: Constructor & AbstractBasicComponent) {
  return function (target: any, propertyKey: string | symbol) {
    const constructor = target.constructor as BaseEntity;

    if (!constructor._components) {
      constructor._components = [];
    }

    const components = constructor.getComponents(constructor);
    components.push(new ComponentDecoratorElement(propertyKey, component));
    constructor._components.set(constructor, components);
  };
}
