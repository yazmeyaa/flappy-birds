import { Appearance } from "../components/appearance";
import { BoundingBoxComponent } from "../components/bounding_box";
import { MovementComponent } from "../components/movement";
import { PositionComponent } from "../components/position";
import { BaseEntity, Component } from "../engine/entities";

export class Pipe extends BaseEntity {
  @Component(BoundingBoxComponent)
  public boundlingBox!: BoundingBoxComponent;
  @Component(PositionComponent)
  public position!: PositionComponent;
  @Component(Appearance)
  public appearance!: Appearance;
  @Component(MovementComponent)
  public movement!: MovementComponent;
}
