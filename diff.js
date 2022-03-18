// diff.js
// Реализуйте и экспортируйте функцию, которая сравнивает два файла построчно. 
// Сигнатура функции: (path1, path2, callback), где path1 и path2 — пути до первого и второго файла соответственно, 
// а callback — это функция, которая будет вызвана после проведения сравнения. Сигнатура функции callback — (err, data).
//
// Результатом функции является массив, каждый элемент которого состоит из двух элементов. 
// Первый — это строчка из первого файла, второй — это соответствующая строчка из второго. Если строки совпадают, 
// то они не попадают в результат. Если в одном из файлов строка отсутствует, то в массиве подставляется null

// Implement and export a function that compares two files line by line.
// Function signature: (path1, path2, callback), where path1 and path2 are the paths to the first and second file, respectively,
// and callback is the function that will be called after the comparison has been made. The signature of the callback function is (err, data).
//
// The result of the function is an array, each element of which consists of two elements.
// The first is the line from the first file, the second is the corresponding line from the second. If the lines match,
// then they are not included in the result. If there is no line in one of the files, then null is substituted in the array

import fsp from 'fs/promises';
import fs from 'fs';

const diff = async (path1, path2, cb) => {
    const promise1 =  fsp.readFile(path1, 'utf-8')
    const promise2 =  fsp.readFile(path2, 'utf-8')
    let diffArr = [];

    const innerTexts = await Promise.all([promise1, promise2])
        .then((data) => data.map(d =>  d.split('\n').slice(0, -1)))
        .catch((err) => cb(err))

    const length =  innerTexts[0].length > innerTexts[1].length ? innerTexts[0].length : innerTexts[1].length;
    for (let i = 0; i < length; i++) {
        diffArr.push([innerTexts[0][i] ?? null, innerTexts[1][i] ?? null ])
    }

    diffArr = diffArr.filter((elm) => elm[0] !== elm[1])

   return cb(null, diffArr);
}

const diff2 = (path1, path2, cb) => {
    fs.readFile(path1, 'utf-8', (err, data1) => {
        if (err) {
            cb(err);
            return;
        }
        fs.readFile(path2, 'utf-8', (err2, data2) => {
            if (err2) {
                cb(err2);
                return;
            }
            let diffArr = [];
            const innerTexts = [data1, data2].map(d => d.split('\n').slice(0, -1));
            const length = innerTexts[0].length > innerTexts[1].length ?
                innerTexts[0].length : innerTexts[1].length;
            for (let i = 0; i < length; i++) {
                diffArr.push([innerTexts[0][i] ?? null, innerTexts[1][i] ?? null])
            }
            diffArr = diffArr.filter((elm) => elm[0] !== elm[1])
            return cb(null, diffArr)
        })
    })
}
