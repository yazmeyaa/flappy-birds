export type EventListenerType<T extends any> = (e: Event<T>) => void;

export interface IEventManager {
  emit<T extends Event<any>>(eventName: string, event: T): void;
  subscribe<T extends any>(eventName: string, cb: (event: Event<T>) => void): void;
}
export type Event<T extends any = any> = {
  type: string;
  payload: T;
};
