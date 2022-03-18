// asyncFilter.js
// Реализуйте и экспортируйте функцию

// Implement and Export a Function

const coll = [10, 53, true, false, '', NaN, 22];

const asyncFilter = (arr, pred, cb) => {
    const iter = ([head, ...rest], acc) => {
        let newAcc = [...acc];
        
        if (pred(head)) {
            newAcc = [...acc, head]
        }

        if(rest.length === 0) {
            return cb(newAcc)
        }
        
        setTimeout(iter, 0, rest, newAcc)
    }
    iter(arr, [])
       
}
asyncFilter(coll, (v) => typeof v === 'number', (result) => {
    console.log(result); // => [10, 53, NaN, 22]
});

