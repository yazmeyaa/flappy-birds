import {
  COLLISION_DETECT_EVENT_NAME,
  CollisionPayload,
} from "../../systems/collision_detect";
import { SceneChangedEventPayload } from "../renderer";
import { SCENE_CHANGED_EVENT_NAME } from "../renderer/consts";

export type EventListenerType<T> = (e: Event<T>) => void;

export type InternalEventsMap = {
  [SCENE_CHANGED_EVENT_NAME]: Event<
    SceneChangedEventPayload,
    typeof SCENE_CHANGED_EVENT_NAME
  >;
  [COLLISION_DETECT_EVENT_NAME]: Event<
    CollisionPayload,
    typeof COLLISION_DETECT_EVENT_NAME
  >;
};

export type KnownEvent = keyof InternalEventsMap;

export interface IEventManager {
  emit<K extends KnownEvent | (string & {})>(
    eventName: K,
    payload: K extends KnownEvent ? InternalEventsMap[K]["payload"] : unknown
  ): void;

  subscribe<K extends KnownEvent>(
    eventName: K,
    cb: (event: Event<InternalEventsMap[K]["payload"], K>) => void
  ): void;

  subscribe<T>(eventName: string, cb: (event: Event<T, string>) => void): void;
}

export type Event<V, K extends string = string> = {
  type: K;
  payload: V;
};
