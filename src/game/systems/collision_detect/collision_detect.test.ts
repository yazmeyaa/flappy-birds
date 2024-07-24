import { BoundingBoxComponent } from "../../components/bounding_box";
import { Collidable } from "../../components/collider";
import { World } from "../../engine/world";
import { CollisionDetectSystem } from "./collision_detect";
import { COLLISION_DETECT_EVENT_NAME } from "./consts";
import { CollisionPayload } from "./types";

jest.useFakeTimers();
jest.spyOn(window, "requestAnimationFrame");

describe("Test CollisionSystem", () => {
  test("CollisionSystem detects collision between intersecting bounding boxes", () => {
    jest.runAllTimers();

    /* ______________ WORLD SETUP ______________ */
    const world = new World();
    world.systems.register(new CollisionDetectSystem());
    world.components.registerStorage(
      BoundingBoxComponent,
      () => new BoundingBoxComponent(0, 0, 0, 0)
    );
    world.components.registerStorage(Collidable, () => new Collidable());

    const bboxStore = world.components.getStorage<BoundingBoxComponent>(BoundingBoxComponent);

    /* ______________ SETUP ENTITIES ______________ */

    // Создаем две сущности с пересекающимися bounding box'ами
    const entity1 = bboxStore.add(1);
    const entity2 = bboxStore.add(2);

    // Bounding Box 1: (0, 0) с шириной 5 и высотой 5
    entity1.left = 0;
    entity1.top = 0;
    entity1.width = 5;
    entity1.height = 5;

    // Bounding Box 2: (4, 4) с шириной 5 и высотой 5 (пересекается с первым)
    entity2.left = 4;
    entity2.top = 4;
    entity2.width = 5;
    entity2.height = 5;

    /* ______________ TEST ______________ */

    let wasCollided = false;

    world.events.subscribe<CollisionPayload>(
      COLLISION_DETECT_EVENT_NAME,
      () => {
        wasCollided = true;
      }
    );

    // Выполняем проверку коллизий
    world.update();
    expect(wasCollided).toBe(true);
    // Проверяем, что метод handleCollision был вызван с правильными параметрами
  });

  test("CollisionSystem does not detect collision between non-intersecting bounding boxes", () => {
    jest.runAllTimers();

    /* ______________ WORLD SETUP ______________ */
    const world = new World();
    world.systems.register(new CollisionDetectSystem());
    world.components.registerStorage(
      BoundingBoxComponent,
      () => new BoundingBoxComponent(0, 0, 0, 0)
    );

    const bboxStore = world.components.getStorage<BoundingBoxComponent>(BoundingBoxComponent);

    /* ______________ SETUP ENTITIES ______________ */

    // Создаем две сущности с непересекающимися bounding box'ами
    const entity1 = bboxStore.add(1);
    const entity2 = bboxStore.add(2);

    // Bounding Box 1: (0, 0) с шириной 5 и высотой 5
    entity1.left = 0;
    entity1.top = 0;
    entity1.width = 5;
    entity1.height = 5;

    // Bounding Box 2: (6, 6) с шириной 5 и высотой 5 (не пересекается с первым)
    entity2.left = 6;
    entity2.top = 6;
    entity2.width = 5;
    entity2.height = 5;

    /* ______________ TEST ______________ */

    let wasCollided = false;

    world.events.subscribe<CollisionPayload>(
      COLLISION_DETECT_EVENT_NAME,
      () => {
        wasCollided = true;
      }
    );

    world.update();
    expect(wasCollided).toBe(false);
  });
});
