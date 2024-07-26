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

  private createPipe(world: IWorld): Pipe {
    const pipe = new Pipe();
    pipe.init(world);

    pipe.position.x = 0;
    pipe.position.y = 100;
    pipe.boundlingBox.top = pipe.position.y;
    pipe.boundlingBox.left = pipe.position.x;
    pipe.boundlingBox.width = 100;
    pipe.boundlingBox.height = 20;
    pipe.appearance.color = "green";

    return pipe;
  }

  private createBird(world: IWorld): FlappyBird {
    const bird = new FlappyBird();
    bird.init(world);

    bird.position.x = 30;
    bird.position.y = 0;
    bird.boundingBox.left = bird.position.x;
    bird.boundingBox.top = bird.position.y;
    return bird;
  }

  public onMount(world: IWorld): void {
    const bird = this.createBird(world);
    const pipe2 = this.createPipe(world);
    pipe2.boundlingBox.width = 50;
    pipe2.boundlingBox.height = 400;
    pipe2.position.x = 400;
    pipe2.position.y = 400;
    this.bird = bird;

    window.addEventListener("mousedown", () => {
      bird.movement.velocity.setY(-5.3);
      bird.movement.acceleration.setY(0);
    });

    world.events.subscribe<CollisionPayload>(
      COLLISION_DETECT_EVENT_NAME,
      (event) => {
        if ([event.payload.entityA, event.payload.entityB].includes(bird.id)) {
          bird.appearance.color = "orange";
          alert("Game over!!!");

          game.renderer.scenes.changeScene(this.name);
        }
      }
    );

    const obstacleRect2 = new Graphics().rect(
      pipe2.position.x,
      pipe2.position.y,
      pipe2.boundlingBox.width,
      pipe2.boundlingBox.height
    );

    pipe2.movement.velocity.setX(-3);

    const rect = new Graphics().rect(
      bird.position.x,
      bird.position.y,
      bird.boundingBox.width,
      bird.boundingBox.height
    );

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
      if (pipe2.position.x + pipe2.boundlingBox.width <= 0) {
        pipe2.position.x = 800 + pipe2.boundlingBox.width;
      }
      obstacleRect2.clear();
      obstacleRect2.rect(
        pipe2.position.x,
        pipe2.position.y,
        pipe2.boundlingBox.width,
        pipe2.boundlingBox.height
      );
      obstacleRect2.fillStyle = pipe2.appearance.color;
      obstacleRect2.fill();
    });

    this.container.addChild(rect);
    this.container.addChild(obstacleRect2);
  }
  public onUnmount(world: IWorld): void {
    if (this.bird) {
      this.bird.position.y = 300;
    }
    this.bird?.movement.acceleration.set(0, 0);
    this.bird?.movement.velocity.set(0, 0);
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
