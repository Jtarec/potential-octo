import { parasiticInheritance } from './index'

describe('parasiticInheritance', () => {
  it('perfect parasiticInheritance', () => {
    function Parent(name) {
      this.name = name
    }
    Parent.prototype.getName = function() {
      return this.name
    }
    function Child(name, age, colors) {
      // 构造函数继承用法
      Parent.call(this, name)
      this.age = age
      this.color = [...colors]
      this.setColor = function(color) {
        this.color.push(color)
      }
      this.getColors = function() {
        return this.color.join(', ')
      }
    }
    parasiticInheritance(Parent, Child)
    const c1 = new Child('Btrya', 20, ['blue'])
    const c2 = new Child('Asaki', 18, ['pink'])
    expect(c1.getName()).toEqual('Btrya')
    c1.name = "Test"
    expect(c1.getName()).toEqual('Test')
    expect(c2.getName()).toEqual('Asaki')
    c1.setColor('black')
    expect(c1.getColors()).toEqual('blue, black')
    expect(c2.getColors()).toEqual('pink')
  })
})
