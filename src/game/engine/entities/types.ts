import { BasicComponent } from "@/engine/components";
import { AbstractBasicComponent } from "../components/types";

export type ComponentConfig<T extends BasicComponent = BasicComponent> = {
  component: AbstractBasicComponent & (new (...args: any[]) => T);
  constructorArgs?: readonly any[];
};

export type ComponentInstances<T extends readonly ComponentConfig[]> = {
  [K in T[number]["component"]["component_name"]]: InstanceType<
    T[number]["component"]
  >;
};


