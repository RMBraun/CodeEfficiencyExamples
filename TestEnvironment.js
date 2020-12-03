const origMap = Array.prototype.map
const origFind = Array.prototype.find
const origReduce = Array.prototype.reduce

var count = 0;

function incCount() {
  count = count + 1
}

function decCount() {
  count = count - 1
}

function resetCount() {
  count = 0
}

function getCount() {
  return count
}

function find(func) {
  return origFind.bind(this)((...inputs) => {
    incCount()
    return func(...inputs)
  })
}

function map(func) {
  return origMap.bind(this)((...inputs) => {
    incCount()
    return func(...inputs)
  })
}

function reduce(func, startVal) {
  return origReduce.bind(this)(
    (...inputs) => {
      incCount()
      return func(...inputs)
    },
    startVal
  )
}

const columnWidth = 20
const headers = [
    'Test Data Length',
    'Total Loop Count',
    'Loop Count / Data Length'
]
.map(header => header.padEnd(columnWidth, ' '))

function init() {
  Array.prototype.find = find
  Array.prototype.map = map
  Array.prototype.reduce = reduce

  console.log(headers.join(''))
}

function run(func, testData, showOutput = false) {
    const data = Array.isArray(testData) ? testData : [testData]

    for(var i = 0; i < data.length; i++) {
        resetCount()
        console.log('\n')
        const dataLength = data[i].length
        const output = func(data[i])
        const outputCount = getCount()

        console.log([
            dataLength,
            outputCount,
            outputCount/dataLength
        ]
        .map((value, i) => value
            .toString()
            .padEnd(columnWidth, ' ')
        )
        .join(''))

        if(showOutput) {
            console.log(output)
        }
    }}

module.exports = {
  incCount,
  decCount,
  resetCount,
  getCount,
  init,
  run,
  find
}