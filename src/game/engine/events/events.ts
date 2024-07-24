import { Event, EventListenerType, IEventManager } from "./types";

export class EventManager implements IEventManager {
  private listeners: Map<string, EventListenerType<any>[]> = new Map();

  public emit<T extends object>(eventName: string, event: Event<T>): void {
    if (!this.listeners.has(eventName)) return;

    for (const cb of this.listeners.get(eventName)!) {
      cb(event);
    }
  }

  public subscribe<T extends any>(
    eventName: string,
    cb: EventListenerType<T>
  ): void {
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, []);
    this.listeners.get(eventName)!.push(cb);
  }
}
