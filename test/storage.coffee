Storage = require "../main"

equal = assert.equal

describe "Storage", ->
  
  it "should set and get", ->
    object =
      key: "test"
      cool: true
      num: 17
      sub:
        a: true
        b: 14
        c: "str"
  
    Storage.set("__TEST", object)
    ret = Storage.get("__TEST")
    equal ret.key, object.key
    equal ret.cool, object.cool
    equal ret.num, object.num
    equal ret.sub.a, object.sub.a
    equal ret.sub.b, object.sub.b
    equal ret.sub.c, object.sub.c

    Storage.set("__TEST", 0)
    ret = Storage.get("__TEST")
    equal ret, 0

    Storage.set("__TEST", false)
    ret = Storage.get("__TEST")
    equal ret, false

    Storage.set("__TEST", "")
    ret = Storage.get("__TEST")
    equal ret, ""

  it "should have Storage.new", ->
    local = Storage.new("TEST")
    key = "a test value"

    local.set(key, true)
    equal local.get(key), true

    equal Storage.get(key), null
