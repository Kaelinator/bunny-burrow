const set = require('../set')(false)
const thumpSet = require('../set')(true)

describe('set', () => {

  it('sets deeply burrowed data', () => {

    expect(
      set('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })
  })

  it('maintains original data', () => {

    expect(
      set('a.b.c', { d: 1 }, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } }, d: 1 })
  })

  it('returns data unchanged if template is not of type string or array', () => {

    expect(
      set(undefined, { a: 1 }, 1)
    ).toEqual({ a: 1 })

    expect(
      set(undefined, { a: { b: 1 } }, 1)
    ).toEqual({ a: { b: 1 } })

    expect(set(1, {}, 1)).toEqual({})
    expect(set(null, {}, 1)).toEqual({})
    expect(set(true, {}, 1)).toEqual({})
  })

  it('treats data as an object if data is not of type object', () => {

    expect(
      set('a', undefined, 1)
    ).toEqual({ a: 1 })

    expect(set('a', 42, 1)).toEqual({ a: 1 })
    expect(set('a', true, 1)).toEqual({ a: 1 })
    expect(set('a', null, 1)).toEqual({ a: 1 })
    expect(set('a', 'hi', 1)).toEqual({ a: 1 })
  })
})

describe('thumpSet', () => {

  it('performs like burrow.set', () => {

    expect(
      thumpSet('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })

    expect(
      thumpSet('a.b.c', { d: 1 }, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } }, d: 1 })
  })

  it('throws TypeError when value is unspecified', () => {
    
    const noParam = () => thumpSet('a', {}, undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('value must be specified, recieved undefined.')
  })
})