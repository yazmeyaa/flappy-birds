import { MovementComponent } from "../../components/movement";
import { PositionComponent } from "../../components/position";
import { World } from "../world";
import { createEntity } from "./entities";

describe("Test entities", () => {
  test("Creating entities", () => {
    const world = new World();
    world.components.registerStorage(
      MovementComponent,
      () => new MovementComponent()
    );

    const entity = createEntity(world, [{ component: MovementComponent }]);

    expect(entity.components).toHaveProperty(MovementComponent.component_name);
    expect(entity.components.movement).not.toBeNull();
    expect(entity.components.movement).not.toBeUndefined();
  });

  test("Modifiyng entities", () => {
    const world = new World();
    world.components.registerStorage(
      MovementComponent,
      () => new MovementComponent()
    );
    world.components.registerStorage(
      PositionComponent,
      () => new PositionComponent()
    );
    const positionStorage =
      world.components.getStorage<PositionComponent>(PositionComponent)!;

    const entity = createEntity(world, [{ component: PositionComponent }]);

    expect(entity.components.position.x).toBe(0);
    entity.components.position.x = 25;
    expect(positionStorage.get(entity.id)).not.toBeNull();
    expect(positionStorage.get(entity.id)!.x).toBe(25);
  });
});
