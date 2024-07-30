import { IWorld, World } from "../world";
import { Renderer } from "./renderer";
import { BasicScene } from "./types";

jest.mock("pixi.js", () => {
  const actualPixi = jest.requireActual("pixi.js");
  return {
    ...actualPixi,
    Application: jest.fn().mockImplementation(() => ({
      stage: new actualPixi.Container(),
      render: jest.fn(),
      init: jest.fn(),
      canvas: document.createElement("canvas"),
    })),
  };
});

class TestScene extends BasicScene {
  public name = "test";
  public onMount() {
    /* mock implementation */
  }
  public onUnmount() {
    /* mock implementation */
  }
}

describe("Renderer", () => {
  let renderer: Renderer;
  let testScene: TestScene;
  let world: IWorld;

  beforeEach(() => {
    world = new World();
    renderer = new Renderer(world);
    testScene = new TestScene();
    renderer.scenes.addScene(testScene);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with a SceneManager", () => {
    expect(renderer.scenes).toBeDefined();
  });

  it("should append child to target element", async () => {
    const target = document.createElement("div");
    await renderer.appendTo(target);
    expect(renderer["app"].init).toHaveBeenCalledWith({ resizeTo: target });
    expect(target.contains(renderer["app"].canvas)).toBe(true);
  });

  it("should render the active scene", () => {
    renderer.scenes.changeScene("test");
    renderer.render();
    expect(renderer["app"].stage).toBe(testScene.container);
  });

  it("should not render if there is no active scene", () => {
    renderer.render();
    expect(renderer["app"].render).not.toHaveBeenCalled();
  });
});
