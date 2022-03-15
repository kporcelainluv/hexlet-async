// reverse.js
// Реализуйте и экспортируйте асинхронную функцию reverse(), которая изменяет порядок расположения строк в файле на обратный. 
// Функция должна перезаписать файл.

// Implement and export an asynchronous reverse() function that reverses the order of lines in a file.
// The function should overwrite the file.

import fs from 'fs/promises';

const reverse = (filename) => fs.readFile(filename, 'utf-8')
    .then((text) => {
        const reversedText = text.split('\n').reverse().join('\n');
        return fs.writeFile(filename, reversedText);
    })

reverse('file.txt');
// two
// one