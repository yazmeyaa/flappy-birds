import { BasicComponent } from "../../engine/components";

export class Appearance extends BasicComponent {
  static readonly component_name: string = "appearance";

  color: string = "#ff0000";
}
