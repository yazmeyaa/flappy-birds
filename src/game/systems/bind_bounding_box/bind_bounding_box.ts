import { BoundingBox } from "../../components/bounding_box";
import { PositionComponent } from "../../components/position";
import { System } from "../../engine/systems";
import { IWorld } from "../../engine/world";

export class BindBoundingBoxSystem extends System {
    readonly name: string = 'bind_bounding_box';
    public priority: number = 1;
    public compute(world: IWorld): void {
        const positionStore = world.components.getStorage<PositionComponent>(PositionComponent)
        const boundingBoxStore = world.components.getStorage<BoundingBox>(BoundingBox)

        positionStore.bitmap().and(boundingBoxStore.bitmap()).range((x) => {
            const entityPosition = positionStore.get(x)!;
            const entityBoundingBox = boundingBoxStore.get(x)!;

            entityBoundingBox.left = entityPosition.x;
            entityBoundingBox.top = entityPosition.y;
            return true;
        })
    }
}