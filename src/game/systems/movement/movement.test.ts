import { MovementComponent } from "../../components/movement";
import { PositionComponent } from "../../components/position";
import { World } from "../../engine/world";
import { MovementSystem } from "./movement";

jest.useFakeTimers();
jest.spyOn(window, "requestAnimationFrame");

describe("Test MovementSystem", () => {
  test("MovementSystem updates position correctly", async () => {
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
    expect(entityMov.velocity.getX()).toBe(2);
    expect(entityMov.velocity.getY()).toBe(2);

    requestAnimationFrame(() => {
      world.timer.update();
      const deltaTimeInSeconds = world.timer.deltaMS / 1000;
      const expectedPositionX =
        entityPos.x + entityMov.velocity.getX() * deltaTimeInSeconds;
      const expectedPositionY =
        entityPos.y + entityMov.velocity.getY() * deltaTimeInSeconds;

      expect(entityPos.x).toBeCloseTo(expectedPositionX, 4);
      expect(entityPos.y).toBeCloseTo(expectedPositionY, 4);
    })
  });
});
