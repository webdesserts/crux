var Crux = require('../index.js')
var expect = require('chai').expect

describe('Crux', function () {
  var Point;
  beforeEach(function () {
    Point = Crux.create()
    Point.init = function (x, y) {
      this.x = x
      this.y = y
    }
  })

  describe('object creation', function () {
    describe('.extend()', function () {
      it('creates a new object, but does\'t initialize it yet', function () {
        var Shape = Point.extend()
        expect(Shape).to.not.have.property('x')
        expect(Shape).to.not.have.property('y')
        expect(Shape.proto).to.eq(Point)
      })
    })
    describe('.create([params...])', function () {
      it('calls Object.create on itself and returns the result', function () {
        var point = Point.create(3,4)
        expect(Point.isPrototypeOf(point)).to.be.true
      })

      it('will call .init() on the resulting object', function () {
        Point.init = function () { this.x = this.y = 0 }
        var point = Point.create()
        expect(point.x).to.eq(0)
        expect(point.y).to.eq(0)
        expect(Point.x).to.be.undefined
      })

      it('will pass any arguments to the init() function', function () {
        var point = Point.create(3,-3)
        expect(point.x).to.eq(3)
        expect(point.y).to.eq(-3)
        expect(Point.x).to.be.undefined
      })
    })
  })

  describe('accessing prototypes', function () {
    describe('.proto:get', function () {
      it('references the prototype of this object', function () {
        expect(Point.proto).to.eq(Crux)
      })
    })
    describe('.proto:set', function () {
      it('sets the prototype when possible', function () {
        Pointless = Crux.create()
        Point.proto = Pointless
        expect(Object.getPrototypeOf(Point)).to.eq(Pointless)
      })
    })
  })
})
