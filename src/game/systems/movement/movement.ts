import { MovementComponent } from "../../components/movement";
import { PositionComponent } from "../../components/position";
import { System } from "../../engine/systems";
import { PriorityCategories } from "../../engine/systems/consts";
import { IWorld } from "../../engine/world";

export class MovementSystem extends System {
  public name: string = "movement_system";
  public priority: number = PriorityCategories.PHYSICS + 50;

  constructor() {
    super();
  }

  private getStores(world: IWorld) {
    const movement =
      world.components.getStorage<MovementComponent>(MovementComponent);
    const position =
      world.components.getStorage<PositionComponent>(PositionComponent);
    return { movement, position };
  }

  private applyAcceleration(world: IWorld): void {
    const { movement } = this.getStores(world);

    movement.bitmap().range((x) => {
      const entityMovement = movement.get(x)!;

      entityMovement.velocity = entityMovement.velocity.add(
        entityMovement.acceleration
      );
      return true;
    });
  }

  private applyVelocity(world: IWorld) {
    const { movement, position } = this.getStores(world);
    movement
      .bitmap()
      .and(position.bitmap())
      .range((x) => {
        const entityMovement = movement.get(x)!;
        const entityPosition = position.get(x)!;

        entityPosition.x +=
          entityMovement.velocity.getX() * world.timer.deltaTime;
        entityPosition.y +=
          entityMovement.velocity.getY() * world.timer.deltaTime;

        return true;
      });
  }

  public compute(world: IWorld): void {
    this.applyAcceleration(world);
    this.applyVelocity(world);
  }
}
