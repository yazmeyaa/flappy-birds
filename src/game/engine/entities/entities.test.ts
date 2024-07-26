import { PositionComponent } from "@/src/game/components/position";
import { World } from "../world";
import { BaseEntity, Component } from "./entities";

class ExampleEntnty extends BaseEntity {
  @Component(PositionComponent)
  public position!: PositionComponent;
}

describe("Entities creation", () => {
  test("Create and modify entities", () => {
    const world = new World();
    world.components.registerStorage(
      PositionComponent,
      () => new PositionComponent()
    );

    const entity = new ExampleEntnty();
    const entity2 = new ExampleEntnty();
    entity.init(world);
    entity2.init(world);

    expect(entity.initiated).toBe(true);
    expect(entity2.initiated).toBe(true);

    expect(entity.position).not.toBeUndefined();
    expect(entity2.position).not.toBeUndefined();

    const position2 = world.components
      .getStorage<PositionComponent>(PositionComponent)
      .get(entity2.id);
    const position = world.components
      .getStorage<PositionComponent>(PositionComponent)
      .get(entity.id);

    entity.position.x = 25;
    entity2.position.x = 666;

    expect(position?.x).toBe(25);
    expect(position2?.x).toBe(666);
  });
});
