import {
  EventListenerType,
  IEventManager,
  InternalEventsMap,
  KnownEvent,
} from "./types";

export class EventManager implements IEventManager {
  private listeners: Map<string, EventListenerType<any>[]> = new Map();

  public emit<K extends KnownEvent | (string & {})>(
    eventName: K,
    payload: K extends KnownEvent ? InternalEventsMap[K]["payload"] : unknown
  ): void {
    if (!this.listeners.has(eventName)) return;

    for (const cb of this.listeners.get(eventName)!) {
      cb({
        type: eventName,
        payload,
      });
    }
  }

  public subscribe<T>(
    eventName: string | KnownEvent,
    cb: EventListenerType<T>
  ): void {
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, []);
    this.listeners.get(eventName)!.push(cb);
  }
}
