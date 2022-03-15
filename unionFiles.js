// unionFiles.js
// Реализуйте и экспортируйте асинхронную функцию unionFiles(), которую мы рассматривали в предыдущих уроках

// Implement and export the unionFiles() asynchronous function that we covered in previous lessons

import fs from 'fs';
import async from 'async';
const { waterfall } = async;

export const unionFiles2 = async (inputPath1, inputPath2, outputPath, cb) => {
    waterfall([
        function(callback) {
            fs.readFile(inputPath1, 'utf-8', callback)
        },
        (...args) => {
            const [data1, callback] = args;
            fs.readFile(inputPath2, 'utf-8', (err, data2) => callback(err, data1, data2))
        },
        (...args) => {
            const [data1, data2, callback] = args;
            fs.writeFile(outputPath, data1+data2, callback)
        },
    ], (err, result) => {
        if (err) {
            return cb(err);
        }
        return cb(null, result)
    });
}


unionFiles2('./res1.txt', './undefined', './res4dewf.txt', () => console.log('done'))
