module.exports = function raceAll (promises) {
    promises = promises.slice()
    const result = []
    for (let i = 0, l = promises.length; i < l; i++) {
        result.push(
            new Promise((resolve, reject) => {
                let first = true
                const ok = k => data => {
                    if (first) {
                        first = false
                        promises.splice(k, 1)
                        resolve(data)
                    }
                }
                const err = k => error => {
                    if (first) {
                        first = false
                        promises.splice(k, 1)
                        reject(error)
                    }
                }
                if (result[i-1]) {
                    result[i-1].finally(() => {
                        promises.map((p, k) => {
                            p.then(ok(k))
                            p.catch(err(k))
                        })
                    })
                } else {
                    promises.map((p, k) => {
                        p.then(ok(k))
                        p.catch(err(k))
                    })
                }
            })
        )
    }
    return result
}