import { IWorld } from "../world";
import { SCENE_CHANGED_EVENT_NAME } from "./consts";
import { BasicScene, ISceneManager, SceneChangedEventPayload } from "./types";

export class SceneManager implements ISceneManager {
  private currentScene: BasicScene | null = null;
  private scenesMap: Map<string, BasicScene> = new Map();
  private world: IWorld;

  constructor(world: IWorld) {
    this.world = world;
  }

  addScene(scene: BasicScene): void {
    if (this.scenesMap.has(scene.name)) return;
    this.scenesMap.set(scene.name, scene);
  }
  removeScene(name: string): void {
    this.scenesMap.delete(name);
  }
  changeScene(name: string): void {
    if (!this.scenesMap.has(name)) {
      throw new Error(
        `Scene with name ${name} is not available. Try to add scene via SceneManager.add(${name}, scene)`
      );
    }
    const eventPayload: SceneChangedEventPayload = {
      prev: this.currentScene,
      current: null,
    };

    this.world.pause();

    this.currentScene?.onUnmount(this.world);
    this.currentScene = this.scenesMap.get(name)!;
    this.currentScene.onMount(this.world);

    eventPayload.current = this.currentScene;
    this.world.events.emit(SCENE_CHANGED_EVENT_NAME, eventPayload);

    this.world.start();
  }
  activeScene(): BasicScene | null {
    return this.currentScene;
  }
}
