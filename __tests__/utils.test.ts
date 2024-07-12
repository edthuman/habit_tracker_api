const createRef = require("../db/seeding/utils").createRef

describe("createRef", () => {
    test("should return an object", () => {
        const inputArr = [{ name: "Jeff", age: 10 }]
        const inputKey = "name"
        const inputValue = "age"

        const output = createRef(inputArr, inputKey, inputValue)
        const isOutputObject = Object.prototype.toString.apply(output) === "[object Object]"
        
        expect(isOutputObject).toBe(true)
    })
    test("should return an empty object when passed an empty array", () => {
        const input: any[] = []

        const output = createRef(input, "key", "value")

        expect(output).toEqual({})
    })
    test("should return an empty object when passed an array with an empty object inside", () => {
        const input = [{}]

        const output = createRef(input, "key", "value")

        expect(output).toEqual({})
    })
    test("should return the correct object when passed one object in an array", () => {
        const inputObj = [{ name: "Jeff", age: 10 }]

        const output = createRef(inputObj, "name", "age")
        const expectedOutput = { Jeff: 10 }
        
        expect(output).toEqual(expectedOutput)
    })
    test("should return the correct object when passed 2 objects in an array", () => {
        const input = [{ name: "Jeff", age: 10 }, { name: "Geoff", age: 40 }]

        const output = createRef(input, "name", "age")
        const expectedOutput = { Jeff: 10, Geoff: 40 }

        expect(output).toEqual(expectedOutput)
    })
    test("should return the correct object for multiple objects in an array", () => {
        const input = [{ name: "Jeff", age: 10 }, { name: "Geoff", age: 40 }, {name: "Daisy", age: 18}, {name: "Paul", age: 25}]

        const output = createRef(input, "name", "age")
        const expectedOutput = { "Jeff": 10, "Geoff": 40, "Daisy": 18, "Paul": 25 }

        expect(output).toEqual(expectedOutput)
    })
    test("should ignore properties on an object not named as the target key or value property", () => {
        const input = [{ name: "Jeff", age: 10, faveColour: "green", bestFriend: "Greg"}]

        const output = createRef(input, "name", "age")
        const expectedOutput = { Jeff: 10 }

        expect(output).toEqual(expectedOutput)
    })
    test("should not make a property from an object missing the given key property", () => {
        const inputObj = [{ name: "Jeff", age: 10 }]
        const inputKey = "bad key"

        const output = createRef(inputObj, inputKey, "age")
        const expectedOutput = {}

        expect(output).toEqual(expectedOutput)
    })
    test("should not make a property from an object missing the given value property", () => {
        const inputObj = [{ name: "Jeff", age: 10 }]
        const inputValue = "bad value"

        const output = createRef(inputObj, "name", inputValue)
        const expectedOutput = {}

        expect(output).toEqual(expectedOutput)
    })
    test("should use the value of the first object with a given key property when duplicates exist in the array", () => {
        const input = [{ name: "Jeff", age: 10 }, { name: "Jeff", age: 11 }, { name: "Jeff", age: 12 }]

        const output = createRef(input, "name", "age")
        const expectedOutput = { Jeff: 10 }

        expect(output).toEqual(expectedOutput)
    })
    test("should not mutate the original object", () => {
        const input = [{ name: "Jeff", age: 10 }]
        const inputCopy = [{ name: "Jeff", age: 10 }]

        createRef(input, "name", "age")

        expect(input).toEqual(inputCopy)
    })
})