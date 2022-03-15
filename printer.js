// printer.js
// Реализуйте и экспортируйте асинхронную функцию, которая читает данные файла по указанному пути и выводит их в консоль.

// Implement and export an asynchronous function that reads file data from the specified path and prints it to the console.

import fs from 'fs';

export const print = (filename) => {
    const callback = (error, data) => console.log(data);
    return fs.readFile(filename, 'utf-8', callback);
}


print('./myfile');