// solution.js
// Реализуйте и экспортируйте функцию, которая применяется в том случае, 
// когда асинхронная операция возвращает коллекцию, а на выходе нужно получить массив, состоящий из всех элементов коллекций,
// которые вернула каждая асинхронная операция.

// Implement and export a function that applies when
// when an asynchronous operation returns a collection, and at the output you need to get an array consisting of all elements of the collections,
// which each asynchronous operation returned.

// in promises
// import fs from 'fs/promises';
//
const concat = (collection, fn, cb) => {
    const result = []
    const fnP = (dirName) => new Promise(((resolve, reject) => {
        fn(dirName, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data);
        })
    })).then(res => {
        result.push(...res)
    })
    const promises = collection.map((dirName) => fnP(dirName))
    Promise.all(promises).then(() => {
        cb(result)
    })
}

// const concat = (collection, fn, cb) => {
//     const calledOnce = once(cb)
//
//     return function call (newCol, data) {
//         if (newCol.length === 0) {
//             return calledOnce(null, data);
//         }
//         fn(newCol[0], ((err, res) => {
//             if (err) {
//                return calledOnce(err);
//             }
//             console.log({data, res})
//             call(newCol.slice(1), [...data, ...res], collection.length)
//         }))
//     }(collection, [])
// }
//
// const concat = (arr, asyncFn, callback) => {
//     const calledOnce = once(callback)
//     if(arr.length === 0) return callback(null)
//     const res = []
//     let completed = 0
//
//
//     const cb = (err, result) => {
//         if(err) return calledOnce(err)
//         completed ++
//         res.push(...result)
//         if(completed === arr.length) {
//             calledOnce(null, res)
//         }
//     }
//
//     arr.forEach(item => {
//         asyncFn(item, cb)
//     })
//     return arr
// }

concat(['./dir1', './dir2', './dir3'], fs.readdir, (err, files) => {
    // files is now a list of filenames that exist in the 3 directories

});

const callOrder = [];
const iteratee = (x, cb) => {
    setTimeout(() => {
        callOrder.push(x);
        let y = x;
        const r = [];
        while (y > 0) {
            r.push(y);
            y -= 1;
        }
        cb(null, r);
    }, x * 25);
};

concat([1,  3, 2], iteratee, (err, results) => {
        // expect(results).toEqual([1, 2, 1, 3, 2, 1]);
        // expect(callOrder).toEqual([1, 2, 3]);
        // expect(err === null).toBeTruthy();
        console.log(err);
        console.log(results);
    });