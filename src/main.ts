import { Graphics } from "pixi.js";
import { GameCore } from "./game/engine/core/core";
import { BasicScene } from "./game/engine/renderer";
import { FlappyBirdEntity } from "./game/entities/flappy_bird";
import { MovementComponent } from "./game/components/movement";
import { PositionComponent } from "./game/components/position";
import { FlappyBirdComponent } from "./game/components/flappy_bird";
import { MovementSystem } from "./game/systems/movement";
import { GravitySystem } from "./game/systems/gravity";
import { IWorld } from "./game/engine/world";

const game = new GameCore();
game.world.systems.register(new MovementSystem());
game.world.systems.register(new GravitySystem());

game.world.components.registerStorage(
  PositionComponent,
  () => new PositionComponent()
);
game.world.components.registerStorage(
  MovementComponent,
  () => new MovementComponent()
);
game.world.components.registerStorage(
  FlappyBirdComponent,
  () => new FlappyBirdComponent()
);

const container = document.createElement("div");
container.style.cssText = `display: block;
max-width: 800px;
max-height: 600px;
`;

const bird = FlappyBirdEntity.addEntity(game.world);

class MainMenuScene extends BasicScene {
  public name: string = "main menu";
  public onMount(world: IWorld): void {
    const rect = new Graphics().rect(20, 20, 20, 20);
    world.timer.add(() => {
      rect.x = bird.position.x;
      rect.y = bird.position.y;
    });
    rect.fillStyle = "red";
    rect.fill();

    this.container.addChild(rect);
  }
  public onUnmount(): void {}
}

document.body.appendChild(container);

game.renderer.appendTo(container).then(() => {
  game.world.start();
  const mainMenuScene = new MainMenuScene();
  game.renderer.scenes.addScene(mainMenuScene);
  game.renderer.scenes.changeScene(mainMenuScene.name);
});
