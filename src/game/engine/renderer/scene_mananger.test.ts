import { BasicScene } from "./types";
import { SceneManager } from "./scene_manager";
import { IWorld, World } from "../world";

class MockScene extends BasicScene {
  public name = "MockScene";
  public onMount() {}
  public onUnmount() {}
}

describe("SceneManager", () => {
  let sceneManager: SceneManager;
  let mockScene: MockScene;
  let world: IWorld

  beforeEach(() => {
    world = new World();
    sceneManager = new SceneManager(world);
    mockScene = new MockScene();
  });

  test("should add a scene", () => {
    sceneManager.addScene(mockScene);
    expect(sceneManager.activeScene()).toBe(null);
    sceneManager.changeScene("MockScene");
    expect(sceneManager.activeScene()).toBe(mockScene);
  });

  test("should remove a scene", () => {
    sceneManager.addScene(mockScene);
    sceneManager.removeScene("MockScene");
    expect(() => sceneManager.changeScene("MockScene")).toThrow();
  });

  test("should change the scene", () => {
    sceneManager.addScene(mockScene);
    sceneManager.changeScene("MockScene");
    expect(sceneManager.activeScene()).toBe(mockScene);
  });

  test("should return the active scene", () => {
    expect(sceneManager.activeScene()).toBe(null);
    sceneManager.addScene(mockScene);
    sceneManager.changeScene("MockScene");
    expect(sceneManager.activeScene()).toBe(mockScene);
  });
});
