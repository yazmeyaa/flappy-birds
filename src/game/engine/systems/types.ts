import { IWorld } from "../world/types";

export abstract class System {
  abstract readonly name: string;
  public abstract priority: number;
  public abstract compute(world: IWorld): void;
  public setPriority(x: number): void {
    this.priority = x;
  }
}

export interface ISystemsManager {
  register(system: System): void;
  compute(world: IWorld): void;
}
