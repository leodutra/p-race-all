module.exports = function raceAll(promises) {
    const results = []
    const functions = []
    for (let i = 0, l = promises.length; i < l; i++) {
        results.push(
            new Promise((resolve, reject) => functions.push({ resolve, reject }))
        )
        Promise.resolve(promises[i])
            .then(value => functions.shift().resolve(value))
            .catch(error => functions.shift().reject(error))
    }
    return results
}
