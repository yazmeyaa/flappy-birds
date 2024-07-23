import { Application } from "pixi.js";
import { IRenderer, ISceneManager } from "./types";
import { SceneManager } from "./scene_manager";

export class Renderer implements IRenderer {
  private app: Application;
  public scenes: ISceneManager;

  constructor() {
    this.app = new Application();
    this.scenes = new SceneManager();
  }

  public async appendTo(target: HTMLElement): Promise<void> {
    await this.app.init({ resizeTo: target });
    target.appendChild(this.app.canvas);
  }

  public render(): void {
    const currentScene = this.scenes.activeScene();
    if (!currentScene) return;
    this.app.stage = currentScene.container;

    this.app.render();
  }
}
