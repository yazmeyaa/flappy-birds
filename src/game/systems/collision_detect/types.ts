import { Event } from "../../engine/events";

export type CollisionPayload = {
  entityA: number;
  entityB: number;
  collisionPoint: {
    x: number;
    y: number;
  };
};

export type CollisionEvent = Event<CollisionPayload>;
