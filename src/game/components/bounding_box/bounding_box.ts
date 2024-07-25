import { BasicComponent } from "../../engine/components";

export class BoundingBoxComponent extends BasicComponent {
  public static readonly component_name = "bounding_box";
  public left: number;
  public top: number;
  public width: number;
  public height: number;

  public get x(): number {
    return this.left;
  }
  public get y(): number {
    return this.top;
  }
  public get bottom(): number {
    return this.top + this.height;
  }
  public get right(): number {
    return this.left + this.width;
  }

  constructor(left: number, top: number, width: number, height: number) {
    super();
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
}
