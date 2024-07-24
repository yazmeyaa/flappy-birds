export type EventListenerType<T extends any> = (e: Event<T>) => void;

export interface IEventManager {
  emit(eventName: string, event: Event): void;
  subscribe(eventName: string, cb: (event: Event) => void): void;
}
export type Event<T extends any = any> = {
  type: string;
  payload: T;
};
