// promisify.js
// Реализуйте и экспортируйте функцию, которая "промисифицирует" асинхронные функции с колбеками.

// Implement and export a function that "promises" async functions with callbacks.

import fs from "fs";

export const promisify = (fc) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            return fc(...args, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            })
        })
    }
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const filepath = './hello';

writeFile(filepath, '23645tdfs')
    .then(() => readFile(filepath))
    .then(console.log);