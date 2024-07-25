import { IWorld } from "../world";
import { ComponentConfig, ComponentInstances } from "./types";

export class Entity<T extends readonly ComponentConfig[]> {
  public id: number;
  public components: ComponentInstances<T>;

  constructor(id: number, components: ComponentInstances<T>) {
    this.id = id;
    this.components = components;
  }
}

const instantiateComponents = <T extends readonly ComponentConfig[]>(
  id: number,
  world: IWorld,
  configs: T
): ComponentInstances<T> => {
  return configs.reduce((acc, { component }) => {
    const comp = world.components.getStorage(component).add(id);
    // @ts-ignore
    acc[component.component_name as keyof ComponentInstances<T>] = comp;
    return acc;
  }, {} as ComponentInstances<T>);
};

export function createEntity<T extends readonly ComponentConfig[]>(
  world: IWorld,
  configs: T
): Entity<T> {
  const id = world.newId();
  const components = instantiateComponents(id, world, configs);
  return new Entity(id, components);
}
