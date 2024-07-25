import { Vector2D } from "ts-vector2d";
import { BasicComponent } from "../../engine/components";

export class MovementComponent extends BasicComponent {
  static readonly component_name = "movement";
  public velocity: Vector2D = new Vector2D(0, 0);
  public acceleration: Vector2D = new Vector2D(0, 0);
}
