const TestEnv = require('./TestEnvironment');
TestEnv.init(this)

function example(testData) { 
    testData.reduce(
        (acc, curr) => {
            const exists = acc.find(x => x.a === curr.a)

            if(exists == null) {
                acc.push(curr)
            }

            return acc
        },
        []
    )
}

// [
//     {a: 1},
//     {a: 2},
//     {a: 3}
// ]

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
