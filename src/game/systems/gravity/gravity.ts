import { Vector2D } from "ts-vector2d";
import { MovementComponent } from "../../components/movement";
import { System } from "../../engine/systems";
import { IWorld } from "../../engine/world";
import { PriorityCategories } from "../../engine/systems/consts";
import { GravityObjectComponent } from "../../components/gravity_object";

export class GravitySystem extends System {
  public name: string = "gravity_system";
  public priority: number = PriorityCategories.PHYSICS + 40;
  public static gravity = new Vector2D(0, 9.81);

  constructor() {
    super();
  }

  private getStores(world: IWorld) {
    const movement =
      world.components.getStorage<MovementComponent>(MovementComponent);
    const gravityObject = world.components.getStorage<GravityObjectComponent>(
      GravityObjectComponent
    );
    return { movement, gravityObject };
  }

  private applyGravity(world: IWorld): void {
    const { movement, gravityObject } = this.getStores(world);
    const gravityAcceleration = GravitySystem.gravity.getY();
    movement
      .bitmap()
      .and(gravityObject.bitmap())
      .range((x) => {
        const entityMovement = movement.get(x)!;
        const newAcceleration =
          entityMovement.acceleration.getY() +
          gravityAcceleration * (world.timer.deltaTime / 1000);
        entityMovement.acceleration.setY(newAcceleration);

        return true;
      });
  }

  public compute(world: IWorld): void {
    this.applyGravity(world);
  }
}
