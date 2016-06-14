var isEnumerable = {}.propertyIsEnumerable

function deepAssign(target, ...sources) {
    if (target == null) {
        throw new TypeError
    }
    var to = Object(target)
    sources.forEach(function(from) {
        new function deepCopy(to, from) {
            if (from !== Object(from)) return
            Reflect.ownKeys(from).forEach(function(key) {

                if (!isEnumerable.call(from, key)) return

                let value = from[key];
                if (value !== Object(value)) {
                    to[key] = value;
                    return
                }

                if (value instanceof RegExp || value instanceof Date ||
                    value instanceof Map || value instanceof Set) {
                    to[key] = new value.constructor(value)
                    return
                }

                if (to[key] === undefined) to[key] = new value.constructor()

                if (to[key] !== Object(to[key]))
                    to[key] = value
                else
                    deepCopy(to[key], value)
            })
        }(to, from)
    })
    return to
}
console.log(deepAssign({a: {b: 0, c:1}}, {a: {b: {d: 1}, c: 2}}, {a:{c: 3}}))
