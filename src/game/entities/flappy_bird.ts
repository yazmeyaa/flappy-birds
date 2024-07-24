import { Appearance } from "../components/appearance";
import { BoundingBoxComponent } from "../components/bounding_box";
import { FlappyBirdComponent } from "../components/flappy_bird";
import { MovementComponent } from "../components/movement/movement";
import { PositionComponent } from "../components/position";
import { Id } from "../engine/components";
import { IWorld } from "../engine/world";

export type FlappyBirdConstructorType = {
  id: Id;
  position: PositionComponent;
  movement: MovementComponent;
  boundingBox: BoundingBoxComponent;
};

export class FlappyBirdEntity {
  public readonly id: Id;
  public position: PositionComponent;
  public movement: MovementComponent;
  public boundingBox: BoundingBoxComponent;
  public appearance: Appearance = new Appearance();

  constructor(bird: FlappyBirdConstructorType) {
    this.id = bird.id;
    this.movement = bird.movement;
    this.position = bird.position;
    this.boundingBox = bird.boundingBox;
  }

  static addEntity(world: IWorld): FlappyBirdEntity {
    const id = world.newId();
    const position = world.components
      .getStorage<PositionComponent>(PositionComponent)
      .add(id);
    const movement = world.components
      .getStorage<MovementComponent>(MovementComponent)
      .add(id);
    const boundingBox = world.components
      .getStorage<BoundingBoxComponent>(BoundingBoxComponent)
      .add(id);
    world.components
      .getStorage<FlappyBirdComponent>(FlappyBirdComponent)
      .add(id);

    return new FlappyBirdEntity({ id, movement, position, boundingBox });
  }

  static getFromStore(world: IWorld, id: Id): FlappyBirdEntity | null {
    const entityExist = world.components
      .getStorage<FlappyBirdComponent>(FlappyBirdComponent)
      .has(id);
    if (!entityExist) return null;

    const position = world.components
      .getStorage<PositionComponent>(PositionComponent)
      .get(id)!;
    const movement = world.components
      .getStorage<MovementComponent>(MovementComponent)
      .get(id)!;
    const boundingBox = world.components
      .getStorage<BoundingBoxComponent>(BoundingBoxComponent)
      .get(id)!;

    return new FlappyBirdEntity({ id, position, movement, boundingBox });
  }
}
