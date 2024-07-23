import { Renderer } from "../renderer";
import { IRenderer } from "../renderer/types";
import { IWorld, World } from "../world";

export class GameCore {
  public world: IWorld = new World();
  public renderer: IRenderer = new Renderer(this.world);

  constructor() {
    this.world.timer.add(() => {
      this.renderer.render();
    });
  }
}
