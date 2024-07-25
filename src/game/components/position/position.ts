import { BasicComponent } from "../../engine/components";

export class PositionComponent extends BasicComponent {
  static readonly component_name = "position";
  x: number = 0;
  y: number = 0;
}
