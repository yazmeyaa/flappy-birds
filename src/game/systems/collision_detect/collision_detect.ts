import { System } from "../../engine/systems";
import { IWorld } from "../../engine/world";
import { BoundingBoxComponent } from "../../components/bounding_box";
import { COLLISION_DETECT_EVENT_NAME } from "./consts";
import { PriorityCategories } from "../../engine/systems/consts";

export class CollisionDetectSystem extends System {
  public name: string = "collision_system";

  public priority: number = PriorityCategories.PHYSICS + 10;

  constructor() {
    super();
  }

  /**
   * Retrieves the storage for bounding boxes.
   * @param world - The world instance containing the component storages.
   * @returns An object containing the bounding box storage.
   */
  private getStores(world: IWorld) {
    const boundingBoxStorage =
      world.components.getStorage<BoundingBoxComponent>(BoundingBoxComponent);
    const collidableStorage =
      world.components.getStorage<BoundingBoxComponent>(BoundingBoxComponent);
    return { boundingBoxStorage, collidableStorage };
  }

  /**
   * Checks if two axis-aligned bounding boxes (AABB) intersect.
   * @param box1 - The first bounding box.
   * @param box2 - The second bounding box.
   * @returns True if the bounding boxes intersect, otherwise false.
   */
  private aabbIntersects(
    box1: BoundingBoxComponent,
    box2: BoundingBoxComponent
  ): boolean {
    return (
      box1.right > box2.left &&
      box1.left < box2.right &&
      box1.bottom > box2.top &&
      box1.top < box2.bottom
    );
  }

  /**
   * Handles the collision between two entities.
   * @param world - The world instance containing the event system.
   * @param entity1 - The ID of the first entity.
   * @param entity2 - The ID of the second entity.
   */
  private handleCollision(
    world: IWorld,
    entity1: number,
    entity2: number
  ): void {
    world.events.emit(COLLISION_DETECT_EVENT_NAME, {
      entityA: entity1,
      entityB: entity2,
      collisionPoint: {
        x: 0,
        y: 0,
      },
    });
  }

  public compute(world: IWorld): void {
    const { boundingBoxStorage, collidableStorage } = this.getStores(world);
    const entities: number[] = [];

    boundingBoxStorage
      .bitmap()
      .and(collidableStorage.bitmap())
      .range((entityId) => {
        entities.push(entityId);
        return true;
      });

    for (let i = 0; i < entities.length; i++) {
      const entity1 = entities[i];
      const box1 = boundingBoxStorage.get(entity1)!;

      for (let j = i + 1; j < entities.length; j++) {
        const entity2 = entities[j];
        const box2 = boundingBoxStorage.get(entity2)!;

        if (this.aabbIntersects(box1, box2)) {
          this.handleCollision(world, entity1, entity2);
        }
      }
    }
  }
}
