import { MovementComponent } from "../../components/movement";
import { PositionComponent } from "../../components/position";
import { World } from "../world";
import { IWorld } from "../world/types";
import { System } from "./types";

jest.useFakeTimers();
jest.spyOn(window, 'requestAnimationFrame');

class MovementSystem implements System {
  public readonly name: string = "movement";
  public priority: number = 0;
  compute(world: IWorld): void {
    const pos =
      world.components.getStorage<PositionComponent>(PositionComponent);
    const mov =
      world.components.getStorage<MovementComponent>(MovementComponent);
    const ids: number[] = [];
    pos
      .bitmap()
      .and(mov.bitmap())
      .range((x) => {
        ids.push(x);
        return true;
      });

    for (const entityId of ids) {
      const entityPosition = pos.get(entityId);
      const entityMovement = mov.get(entityId);
      expect(entityPosition).not.toBeNull();
      expect(entityMovement).not.toBeNull();

      entityPosition!.x += entityMovement!.velocity.getX();
      entityPosition!.y += entityMovement!.velocity.getY();
    }
  }
  setPriority(x: number): void {
    this.priority = x;
  }
}

describe("Test systems", () => {
  test("General testing", () => {
    jest.runAllTimers();
    /* ______________ WORLD SETUP ______________ */
    const world = new World();
    world.systems.register(new MovementSystem());
    world.components.registerStorage(
      PositionComponent,
      () => new PositionComponent()
    );
    world.components.registerStorage(
      MovementComponent,
      () => new MovementComponent()
    );

    const posStore =
      world.components.getStorage<PositionComponent>(PositionComponent);
    const movStore =
      world.components.getStorage<MovementComponent>(MovementComponent);

    /* ______________ SETUP ENTITIES ______________ */

    const entityPos = posStore.add(1);
    const entityMov = movStore.add(1);

    entityPos.x = 1;
    entityPos.y = 1;
    entityMov.velocity.setX(2);
    entityMov.velocity.setY(2);

    /* ______________ TEST ______________ */

    expect(entityPos.x).toBe(1);
    expect(entityPos.y).toBe(1);
    world.update();
    expect(entityPos.x).toBe(3);
    expect(entityPos.y).toBe(3);
  });
});
