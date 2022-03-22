// filter.js
// Реализуйте и экспортируйте функцию, которая принимает коллекцию и применяет к колбек к каждому элементу. 
// Если колбек вернёт false - элемент необходимо отфильтровать. Отфильтрованная коллекция должна сохранять порядок элементов.

// Implement and export a function that takes a collection and applies a callback to each element.
// If the callback returns false, the element must be filtered. The filtered collection must preserve the order of the elements.


const noop = () => {};

const filter = (collection, fn, cb = noop) => {
    if (collection.length === 0) {
        return cb(null, collection)
    }
    const result = []
    const fnP = (item) => new Promise(((resolve, reject) => {
        fn(item, (err, data) => {
            if (err) {
                return reject(err)
            }
            return resolve(data);
        })
    })).then(res => {
        if (res) {
            result.push(item)
        }
    })
    const promises = collection.map(i => fnP(i))
    Promise.all(promises).then(() => cb(null, result)).catch(cb)
}


filter([5, 4, 1, 2], (item, callback) => {
    callback(null, item % 2 === 0);
}, (err, results) => {
    console.log(results); // => [4, 2]
});

export default (coll, iteratee, callback = noop) => {
  const oncedCallback = once(callback);
  let completed = 0;
  const { length } = coll;
  if (length === 0) {
    callback(null, []);
  }

  const mappedColl = [];
  const iteratorCallback = (item, index, err, result) => {
    if (err) {
      oncedCallback(err);
      return;
    }
    if (result) {
      mappedColl[index] = item;
    }
    completed += 1;
    if (completed === length) {
      oncedCallback(err, mappedColl.filter((v) => v !== undefined));
    }
  };

  coll.forEach((item, index) => iteratee(item, iteratorCallback.bind(null, item, index)))
}