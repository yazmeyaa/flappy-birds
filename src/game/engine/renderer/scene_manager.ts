import { BasicScene, ISceneManager } from "./types";

export class SceneManager implements ISceneManager {
  private currentScene: BasicScene | null = null;
  private scenesMap: Map<string, BasicScene> = new Map();

  addScene(scene: BasicScene): void {
    if (this.scenesMap.has(scene.name)) return;
    this.scenesMap.set(scene.name, scene);
  }
  removeScene(name: string): void {
    this.scenesMap.delete(name);
  }
  changeScene(name: string): void {
    this.currentScene?.onUnmount();
    if (!this.scenesMap.has(name)) {
      throw new Error(
        `Scene with name ${name} is not available. Try to add scene via SceneManager.add(${name}, scene)`
      );
    }
    this.currentScene = this.scenesMap.get(name)!;
    this.currentScene.onMount();
  }
  activeScene(): BasicScene | null {
    return this.currentScene;
  }
}
