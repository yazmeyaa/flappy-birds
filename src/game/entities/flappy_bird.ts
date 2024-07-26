import { Appearance } from "../components/appearance";
import { BoundingBoxComponent } from "../components/bounding_box";
import { Collidable } from "../components/collider";
import { MovementComponent } from "../components/movement/movement";
import { PositionComponent } from "../components/position";
import { Id } from "../engine/components";
import { BaseEntity, Component } from "../engine/entities";
import { IWorld } from "../engine/world";
import {
  COLLISION_DETECT_EVENT_NAME,
  CollisionPayload,
} from "../systems/collision_detect";

export class FlappyBird extends BaseEntity {
  @Component(MovementComponent)
  public movement!: MovementComponent;

  @Component(PositionComponent)
  public position!: PositionComponent;

  @Component(BoundingBoxComponent)
  public boundingBox!: BoundingBoxComponent;

  @Component(Collidable)
  public collidable!: Collidable;

  @Component(Appearance)
  public appearance!: Appearance;

  public override init(world: IWorld) {
    super.init(world);

    world.events.subscribe<CollisionPayload>(
      COLLISION_DETECT_EVENT_NAME,
      (event) => {
        if (
          event.payload.entityA === this.id ||
          event.payload.entityB === this.id
        ) {
          console.log("I collided with something!!!");
        }
      }
    );
  }
}
