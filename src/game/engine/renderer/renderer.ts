import { Application } from "pixi.js";
import { IRenderer, ISceneManager } from "./types";
import { SceneManager } from "./scene_manager";
import { IWorld } from "../world";

export class Renderer implements IRenderer {
  private app: Application;
  public scenes: ISceneManager;

  constructor(world: IWorld) {
    this.app = new Application();
    this.scenes = new SceneManager(world);
  }

  public async appendTo(target: HTMLElement): Promise<void> {
    await this.app.init({ resizeTo: target });
    target.appendChild(this.app.canvas);
  }

  public render(): void {
    const currentScene = this.scenes.activeScene();
    if (!currentScene) return;
    this.app.stage = currentScene.container;
  }
}
