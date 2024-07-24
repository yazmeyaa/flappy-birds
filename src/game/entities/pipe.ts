import { Appearance } from "../components/appearance";
import { BoundingBoxComponent } from "../components/bounding_box";
import { PositionComponent } from "../components/position";
import { IWorld } from "../engine/world";

export class Pipe {
    public id: number;
    public boundlingBox: BoundingBoxComponent;
    public position: PositionComponent;
    public appearance: Appearance;
  
    constructor(
      id: number,
      bb: BoundingBoxComponent,
      pos: PositionComponent,
      appearance: Appearance
    ) {
      this.id = id;
      this.boundlingBox = bb;
      this.position = pos;
      this.appearance = appearance;
    }
  
    public static register(world: IWorld): Pipe {
      const id = world.newId();
      const bb = world.components
        .getStorage<BoundingBoxComponent>(BoundingBoxComponent)
        .add(id)!;
      const pos = world.components
        .getStorage<PositionComponent>(PositionComponent)
        .add(id)!;
      const appearance = world.components
        .getStorage<Appearance>(Appearance)
        .add(id)!;
  
      return new Pipe(id, bb, pos, appearance);
    }
  }