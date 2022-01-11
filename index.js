module.exports = function raceAll(promises) {
    const outputPromises = []
    const fulfillmentList = []
    for (let i = 0, l = promises.length; i < l; i++) {
        outputPromises.push(
            new Promise((resolve, reject) => fulfillmentList.push({ resolve, reject }))
        )
        Promise.resolve(promises[i])
            .then(value => fulfillmentList.shift().resolve(value))
            .catch(error => fulfillmentList.shift().reject(error))
    }
    return outputPromises
}
