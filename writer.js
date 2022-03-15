// writer.js
// Реализуйте асинхронную функцию, которая записывает данные по указанному пути и оповещает о завершении работы через переданный колбек.
// Implement an asynchronous function that writes data to the specified path and notifies the completion of work through the passed callback.

import fs from 'fs';

const write = (filename, text, cb) => fs.writeFile(filename, text, cb);

write('./myfile', 'data', () => {
    console.log('success');
});