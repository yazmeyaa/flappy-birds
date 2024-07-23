import { IComponentsManager, Id } from "../components/types";
import { ISystemsManager } from "../systems";
import { Timer } from "../timer";

export interface IWorld {
  components: IComponentsManager;
  systems: ISystemsManager;
  timer: Timer;
  newId(): Id;
  start(): void;
  update(): void;
  pause(): void;
  reset(): void;
  render(): void;
}
