import { throttle, throttleAtLast } from './index'
// 启用定时器模拟器
jest.useFakeTimers();

describe('throttle', () => {
  it('should be executed once at first executive', () => {
    const test = jest.fn();
    const throttled = throttle(test, 1000);
    throttled();
    throttled();

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(1);
  })

  it('should be executed twice at first executive', () => {
    const test = jest.fn();
    const throttled = throttle(test, 200);
    throttled();
    throttled();

    setTimeout(() => {
      throttled()
    }, 300)

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(2);
  })
})

describe('throttle at last', () => {
  it('should be executed once at last executive', () => {
    const test = jest.fn();
    const throttled = throttleAtLast(test, 1000);
    throttled();
    throttled();

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(1);
  })

  it('should be executed twice at last executive', () => {
    const test = jest.fn();
    const throttled = throttle(test, 200);
    throttled();
    throttled();

    setTimeout(() => {
      throttled()
    }, 300)

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(2);
  })
})

