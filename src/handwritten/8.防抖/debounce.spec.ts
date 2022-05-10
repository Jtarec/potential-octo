import { debounce } from './index'
// 启用定时器模拟器
jest.useFakeTimers();

describe('debounce', () => {
  it('should be executed once', () => {
    const test = jest.fn();
    const debounced = debounce(test, 1000);
    debounced();
    debounced();

    jest.runAllTimers();

    expect(test).toHaveBeenCalledTimes(1);
  })
})
