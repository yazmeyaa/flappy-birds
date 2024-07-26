import { GravityObjectComponent } from "../../components/gravity_object";
import { MovementComponent } from "../../components/movement";
import { PositionComponent } from "../../components/position";
import { World } from "../../engine/world";
import { MovementSystem } from "../movement";
import { GravitySystem } from "./gravity";

jest.useFakeTimers();
jest.spyOn(window, "requestAnimationFrame");

describe("Test GravitySystem", () => {
  test("GravitySystem applies gravity correctly", async () => {
    jest.runAllTimers();

    /* ______________ WORLD SETUP ______________ */
    const world = new World();
    world.systems.register(new GravitySystem());
    world.systems.register(new MovementSystem());
    world.components.registerStorage(
      PositionComponent,
      () => new PositionComponent()
    );
    world.components.registerStorage(
      MovementComponent,
      () => new MovementComponent()
    );
    world.components.registerStorage(
      GravityObjectComponent,
      () => new GravityObjectComponent()
    );

    const posStore =
      world.components.getStorage<PositionComponent>(PositionComponent);
    const movStore =
      world.components.getStorage<MovementComponent>(MovementComponent);

    /* ______________ SETUP ENTITIES ______________ */

    const entityPos = posStore.add(1);
    const entityMov = movStore.add(1);

    entityPos.x = 0;
    entityPos.y = 0;
    entityMov.velocity.setX(0);
    entityMov.velocity.setY(0);

    /* ______________ TEST ______________ */

    expect(entityPos.x).toBe(0);
    expect(entityPos.y).toBe(0);
    expect(entityMov.velocity.getX()).toBe(0);
    expect(entityMov.velocity.getY()).toBe(0);

    world.start();
    setTimeout(() => {
      world.pause();

      const gravity = GravitySystem.gravity.getY();
      const deltaTimeInSeconds = 16 / 1000;
      const expectedVelocityY = gravity * deltaTimeInSeconds;

      expect(entityMov.velocity.getX()).toBe(0);
      expect(entityMov.velocity.getY()).toBeCloseTo(expectedVelocityY, 4);
    }, 16);
  });
});
