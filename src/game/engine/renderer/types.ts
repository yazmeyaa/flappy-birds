import { Container, ContainerChild } from "pixi.js";

export interface IRenderer {
  scenes: ISceneManager;
  render(): void;
  appendTo(target: HTMLElement): Promise<void>;
}

export interface ISceneManager {
  addScene(scene: BasicScene): void;
  removeScene(name: string): void;
  changeScene(name: string): void;
  activeScene(): BasicScene | null;
}

export abstract class BasicScene {
  public container: Container<ContainerChild> = new Container();
  public abstract name: string;
  public abstract onMount(): void;
  public abstract onUnmount(): void;
}
