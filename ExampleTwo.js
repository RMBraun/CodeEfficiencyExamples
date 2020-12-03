const TestEnv = require('./TestEnvironment');
TestEnv.init(this)

function example(testData) { 
    testData
      .map(x => ({
          ...x, 
          b: x.b.map(y => y * 2)
    }))
}

const fillData = { 
    a : 1,
    b: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
}

for(var i = 1; i <= 10; i++) {
    TestEnv.run(example, [new Array(i*10).fill(fillData)])
}