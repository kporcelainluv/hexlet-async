// file.js
// Реализуйте и экспортируйте функцию move, которая асинхронно перемещает файл из одного места в другое. Ее параметры:
// 1. Путь до файла исходника
// 2. Путь по которому нужно копировать файл
// 3. Колбек, у которого единственный аргумент — ошибка.

// Implement and export a move function that asynchronously moves a file from one location to another. Its parameters are:
// 1. Path to the source file
// 2. Path where the file should be copied
// 3. Callback, whose only argument is an error.


import fs from 'fs';

export const move = (path1, path2, cb) => {
    fs.readFile(path1, (err1, data) => {
        if(err1) {
            return cb(err1);
        }
        fs.writeFile(path2, data, (err2) => {
            if (err2) {
                return cb(err2);
            }
            fs.unlink(path1, (err) => cb(err))
        })
    })
}

move('/opt/myfile', '/tmp/newfile', (error) => {
    if (error) {
        console.log('oops');
        return;
    }
    console.log('yes!')
});
