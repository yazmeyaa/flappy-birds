import { ComponentsManager } from "../components";
import { IComponentsManager, Id } from "../components/types";
import { SystemManager } from "../systems/systems";
import { ISystemsManager } from "../systems/types";
import { Timer } from "../timer";
import { IWorld } from "./types";

export class World implements IWorld {
  public components: IComponentsManager;
  public systems: ISystemsManager;
  private idCount = 0;
  public timer: Timer;

  constructor() {
    this.components = new ComponentsManager();
    this.systems = new SystemManager();
    this.timer = new Timer();

    this.timer.add(() => {
      this.update();
    });
  }

  public render(): void {
    throw new Error("Method not implemented.");
  }

  public newId(): Id {
    return ++this.idCount;
  }

  public update(): void {
    this.systems.compute(this);
  }

  public start(): void {
    this.timer.start();
  }

  public pause(): void {
    this.timer.stop();
  }

  public reset(): void {
    this.timer.reset();
  }
}
