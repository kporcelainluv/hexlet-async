// info.js
// Реализуйте и экспортируйте асинхронную функцию compareFileSizes(), 
// которая сравнивает размеры двух файлов и передает результат сравнения в переданную callback-функцию.
// Если первый файл больше второго, то она передает единицу, если размеры равны, то ноль, иначе — -1.

// Implement and export an asynchronous compareFileSizes() function,
// which compares the sizes of two files and passes the result of the comparison to the passed callback function.
// If the first file is greater than the second, then it passes one, if the sizes are equal, then zero, otherwise -1.

import fs from 'fs';

export const compareFileSizes = (filepath1, filepath2, cb) => {
    return fs.stat(filepath1, (err, stats1) => {
        fs.stat(filepath2, (err2, stats2) => {
            cb(null, Math.sign(stats1.size - stats2.size))
        })
    })
}

compareFileSizes('filepath1', 'filepath2', (_err, result) => console.log(result));
