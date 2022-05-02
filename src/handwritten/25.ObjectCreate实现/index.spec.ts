import { ObjectCreate } from './index'

describe('ObjectCreate', () => {
  it('should create same obj', () => {
    const targetObj = { 
      foo: 1,
      getFoo: function() {
        return this.foo
      }
    }
    const obj1 = ObjectCreate(targetObj)
    const obj2 = ObjectCreate(targetObj)
    expect(obj1).toEqual(obj2)
    expect(obj1.getFoo()).toEqual(1)
    expect(obj1.__proto__).toEqual(targetObj)
  })
})
