// once.js
// call a func only once. other calls should be ignored

const callback = () => console.log('i am called once');

const once = (cb) => {
    let check = false;
    
    return () => {
        if (check) {
            console.log('i was already called');
            return;
        }
        check = true;
        cb();
    }
}

const test = once(callback);
test()
test()
test()
console.log('-----------')
once(callback)();
once(callback)();