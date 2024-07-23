export type TimerCallbackType = (timer: Timer) => any;

export class Timer {
  public static targetFPMS = 0.06;
  public elapsedMS: number = 0;
  public deltaTime: number = 1;
  public deltaMS: number = 1;
  public lastTime: number = -1;
  public started: boolean = false;
  private _requestId: number | null = null;
  private _callbacks: Array<TimerCallbackType> = [];

  constructor() {
    this._tick = this._tick.bind(this);
  }

  /**
   * Add a callback that will be called every timer tick
   * @param cb Callback to execute
   */
  public add(cb: TimerCallbackType): void {
    this._callbacks.push(cb);
  }

  private _tick(time: number): void {
    this._requestId = null;
    if (this.started) {
      this.update(time);
      if (this.started && this._requestId === null) {
        this._requestId = requestAnimationFrame(this._tick.bind(this));
      }
    }
  }

  private _request(): void {
    if (this._requestId === null) {
      this.lastTime = performance.now();
      this._requestId = requestAnimationFrame(this._tick);
    }
  }

  private _cancel(): void {
    if (this._requestId !== null) {
      cancelAnimationFrame(this._requestId);
      this._requestId = null;
    }
  }

  private _start(): void {
    if (this.started) {
      this._request();
    }
  }

  public start(): void {
    if (!this.started) {
      this.started = true;
      this._start();
    }
  }

  public stop(): void {
    if (this.started) {
      this.started = false;
      this._cancel();
    }
  }

  public reset(): void {
    this.elapsedMS = 0;
    this.deltaTime = 1;
    this.deltaMS = 1;
    this.lastTime = -1;
  }

  public update(currentTime: number = performance.now()): void {
    if (currentTime > this.lastTime) {
      this.elapsedMS = currentTime - this.lastTime;
      this.deltaMS = this.elapsedMS;
      this.deltaTime = this.deltaMS * Timer.targetFPMS;
    } else {
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    }
    this.lastTime = currentTime;

    // After all computes execute every callback;
    for (const cb of this._callbacks) {
      cb(this);
    }
  }

  get FPS(): number {
    return this.elapsedMS > 0 ? 1000 / this.elapsedMS : 0;
  }
}
