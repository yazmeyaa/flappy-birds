import { Timer } from "./timer";

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

describe("Timer", () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  afterEach(() => {
    timer.stop();
  });

  test("should initialize correctly", () => {
    expect(timer.elapsedMS).toBe(0);
    expect(timer.deltaTime).toBe(1);
    expect(timer.deltaMS).toBe(1);
    expect(timer.lastTime).toBe(-1);
    expect(timer.started).toBe(false);
    expect(timer.FPS).toBe(0);
  });

  test("should start and stop the timer", () => {
    timer.start();
    expect(timer.started).toBe(true);
    expect(timer["_requestId"]).not.toBeNull();

    timer.stop();
    expect(timer.started).toBe(false);
    expect(timer["_requestId"]).toBeNull();
  });

  test("should update time correctly", () => {
    timer.start();
    const initialLastTime = timer.lastTime;

    jest.advanceTimersByTime(16); // 16 ms is
    setTimeout(() => {
      timer.update();
    }, 16);

    expect(timer.elapsedMS).toBeGreaterThan(0);
    expect(timer.deltaMS).toBe(timer.elapsedMS);
    expect(timer.deltaTime).toBe(timer.deltaMS * Timer.targetFPMS);
    expect(timer.lastTime).toBeGreaterThan(initialLastTime);

    timer.stop();
  });

  test("should calculate FPS correctly", () => {
    timer.start();

    jest.advanceTimersByTime(16); // Advance by 16ms (approx. one frame at 60fps)
    setTimeout(() => {
      timer.update();
    }, 16);

    expect(timer.FPS).toBeCloseTo(62.5, 1); // FPS should be close to 1000 / 16

    timer.stop();
  });

  test("should not update time if stopped", () => {
    const initialLastTime = timer.lastTime;

    jest.advanceTimersByTime(16); // Advance by 16ms
    setTimeout(() => {
      timer.update();
      expect(timer.elapsedMS).toBe(0);
      expect(timer.deltaMS).toBe(0);
      expect(timer.deltaTime).toBe(0);
      expect(timer.lastTime).toBe(initialLastTime);
    }, 16);
  });

  test("should execute callback", () => {
    let value = 0;
    timer.add(() => {
      value += 10;
    });

    jest.advanceTimersByTime(16);
    setTimeout(() => {
      timer.update();
      expect(value).toBe(10);
    }, 16);
  });
});
