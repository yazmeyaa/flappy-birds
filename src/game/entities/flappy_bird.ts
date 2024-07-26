import { Appearance } from "../components/appearance";
import { BoundingBoxComponent } from "../components/bounding_box";
import { Collidable } from "../components/collider";
import { GravityObjectComponent } from "../components/gravity_object";
import { MovementComponent } from "../components/movement/movement";
import { PositionComponent } from "../components/position";
import { BaseEntity, Component } from "../engine/entities";

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

  @Component(GravityObjectComponent)
  public gravityObject!: GravityObjectComponent;
}
