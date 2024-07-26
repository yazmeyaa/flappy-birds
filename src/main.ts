import { Graphics } from "pixi.js";
import { GameCore } from "./game/engine/core/core";
import { BasicScene } from "./game/engine/renderer";
import { FlappyBird } from "./game/entities/flappy_bird";
import { MovementComponent } from "./game/components/movement";
import { PositionComponent } from "./game/components/position";
import { FlappyBirdComponent } from "./game/components/flappy_bird";
import { MovementSystem } from "./game/systems/movement";
import { GravitySystem } from "./game/systems/gravity";
import { IWorld } from "./game/engine/world";
import { Appearance } from "./game/components/appearance";
import { BoundingBoxComponent } from "./game/components/bounding_box";
import { Collidable } from "./game/components/collider";
import {
  COLLISION_DETECT_EVENT_NAME,
  CollisionDetectSystem,
  CollisionPayload,
} from "./game/systems/collision_detect";
import { BindBoundingBoxSystem } from "./game/systems/bind_bounding_box";
import { Pipe } from "./game/entities/pipe";
import { GravityObjectComponent } from "./game/components/gravity_object";

const game = new GameCore();
game.world.systems.register(new MovementSystem());
game.world.systems.register(new GravitySystem());
game.world.systems.register(new CollisionDetectSystem());
game.world.systems.register(new BindBoundingBoxSystem());

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
game.world.components.registerStorage(Appearance, () => new Appearance());
game.world.components.registerStorage(
  BoundingBoxComponent,
  () => new BoundingBoxComponent(0, 0, 20, 20)
);
game.world.components.registerStorage(Collidable, () => new Collidable());
game.world.components.registerStorage(
  GravityObjectComponent,
  () => new GravityObjectComponent()
);

const container = document.createElement("div");
container.style.cssText = `display: block;
max-width: 800px;
max-height: 600px;
`;

class MainMenuScene extends BasicScene {
  public name: string = "main menu";
  private bird: FlappyBird | null = null;

  public onMount(world: IWorld): void {
    const bird = new FlappyBird();
    const obstacle = new Pipe();
    this.bird = bird;
    bird.init(world);
    obstacle.init(world);

    bird.position.x = 0;
    bird.position.y = 0;
    bird.boundingBox.left = bird.position.x;
    bird.boundingBox.top = bird.position.y;

    obstacle.position.x = 0;
    obstacle.position.y = 100;
    obstacle.boundlingBox.top = obstacle.position.y;
    obstacle.boundlingBox.left = obstacle.position.x;
    obstacle.boundlingBox.width = 100;
    obstacle.boundlingBox.height = 20;
    obstacle.appearance.color = "green";

    world.events.subscribe<CollisionPayload>(
      COLLISION_DETECT_EVENT_NAME,
      () => {
        bird.appearance.color = "orange";
      }
    );

    const obstacleRect = new Graphics().rect(
      obstacle.position.x,
      obstacle.position.y,
      obstacle.boundlingBox.width,
      obstacle.boundlingBox.height
    );
    const rect = new Graphics().rect(
      bird.position.x,
      bird.position.y,
      bird.boundingBox.width,
      bird.boundingBox.height
    );
    rect.label = "flappy";
    world.timer.add(() => {
      rect.clear();
      rect.rect(
        bird.position.x,
        bird.position.y,
        bird.boundingBox.width,
        bird.boundingBox.height
      );
      rect.fillStyle = bird.appearance.color;
      rect.fill();
    });

    world.timer.add(() => {
      obstacleRect.clear();
      obstacleRect.rect(
        obstacle.position.x,
        obstacle.position.y,
        obstacle.boundlingBox.width,
        obstacle.boundlingBox.height
      );
      obstacleRect.fillStyle = obstacle.appearance.color;
      obstacleRect.fill();
    });

    rect.fillStyle = "orange";
    obstacleRect.fillStyle = obstacle.appearance.color;
    obstacleRect.fill();
    rect.fill();

    this.container.addChild(rect);
    this.container.addChild(obstacleRect);
  }
  public onUnmount(world: IWorld): void {
    this.bird?.movement.velocity.set(0, 0);
    this.bird?.movement.acceleration.set(0, 0);
    this.bird?.destroy(world);
  }
}

document.body.appendChild(container);

game.renderer.appendTo(container).then(() => {
  const mainMenuScene = new MainMenuScene();
  game.renderer.scenes.addScene(mainMenuScene);
  game.renderer.scenes.changeScene(mainMenuScene.name);
  game.world.start();
});
