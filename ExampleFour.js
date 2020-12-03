const TestEnv = require('./TestEnvironment');
TestEnv.init(this)

// function example(testData) { 
//     testData
//       .map(x => ({
//           ...x, 
//           b: x.b.map(y => y * 2)
//     }))
// }

function example(testData) { 
    const output = []
    for(var i = 0; i < testData.length; i++) {
        TestEnv.incCount()
        const data = testData[i]
        const b = []

        for(var j = 0; j < data.b.length; j++) {
            TestEnv.incCount()
            b.push(data.b[j] * 2)
        }

        output.push({
            ...data,
            b
        })
    }

    return output
}

const fillData = { 
    a : 1,
    b: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
}

const getData = dataSize => new Array(dataSize)
    .fill(fillData)
    .map((data, i) => ({
        ...data,
        a: i
    }))


for(var i = 1; i <= 10; i++) {
    TestEnv.run(example, [
        getData(i*10)
    ])
}
