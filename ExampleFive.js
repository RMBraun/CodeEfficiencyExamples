const getUniqueSkusByCountry = (users = []) => {
    const skusMap = (users || []).reduce((acc, { sku, country } = {}) => {
      if (sku != null && country != null) {
        const uniqueId = `${sku}${country}`
  
        if (acc[uniqueId] == null) {
          acc[uniqueId] = { sku, country }
        }
      }
  
      return acc
    }, {})
  
    return Object.values(skusMap)
  }

  const getUniqueSkusByCountry2 = (users = []) => {
    const skusMap = (users || []).reduce((acc, { sku, country } = {}) => {
      if (sku != null && country != null) {
        acc[country] = acc[country] || {}
        acc[country][sku] = { skuId: sku, country }
      }
  
      return acc
    }, {})


  
    return [].concat(...Object.values(skusMap).map(Object.values))
  }
  
  const getUniqueSkusByCountry3 = users =>
    (users || []).reduce((acc, { sku, country }) => {
      const exists = acc.find(sku => sku.skuId === sku && sku.country === country)
  
      if (!exists) {
        acc.push({ skuId: sku, country })
      }
  
      return acc
    }, [])
  

  // users = [
  //   { sku: 1, country: 'ca' },
  //   { sku: 1, country: 'us' },
  //   { sku: 2, country: 'ca' },
  //   { sku: 1, country: 'ca' }
  //   ...
  // ]


  ///////////////////////////////////////////////////////////////////////////////
  
  const runTest = (func, shouldSaveResults = false) => {
    const title = func.name
    const results = []
  
    return {
      run: (testData, shouldPrint = true) => {
        const startDate = Date.now()
        func(testData)
        const endDate = Date.now()
        const result = `${title.padEnd(50, '.')} :: ${testData.length} took ${endDate - startDate}ms`
        shouldPrint && console.log(result)
        shouldSaveResults && results.push(result)
      },
      printResults: () => console.log(results.join('\n')),
    }
  }
  
  const runTests = maxDataSize => {
    const testData = []
    for (var i = 0; i < maxDataSize / 2; i++) {
      testData.push({ sku: i.toString(), country: i % 2 === 0 ? 'us' : 'ca' })
    }
    for (var i = 0; i < maxDataSize / 2; i++) {
      testData.push({ sku: i.toString(), country: i % 2 === 0 ? 'us' : 'ca' })
    }
  
    const runTest1 = runTest(getUniqueSkusByCountry)
    const runTest2 = runTest(getUniqueSkusByCountry2)
    const runTest3 = runTest(getUniqueSkusByCountry3)
  
    console.log('')
  
    for (var dataSize = 10; dataSize <= maxDataSize; dataSize = dataSize * 2) {
      const sampleData = testData.slice(0, dataSize)
  
      runTest1.run(sampleData)
      runTest2.run(sampleData)
      runTest3.run(sampleData)
      console.log('----------------------------------------------------------------------------')
    }
  }
  
  runTests(100000)