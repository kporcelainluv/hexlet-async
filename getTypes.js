// getTypes.js
// Реализуйте и экспортируйте асинхронную функцию getTypes(), которая анализирует список переданных путей и возвращает массив (в промисе), с описанием того, 
// что находится по каждому из путей. Эта функция должна отрабатывать успешно в любом случае. Если во время выполнения асинхронной операции возникла ошибка, 
// то значением для этого пути будет null. Для простоты считаем, что в эту функцию всегда передается как минимум один путь для обработки 
// (иначе придется задействовать механизм, который проходится в курсах далее).

// Implement and export an asynchronous getTypes() function that parses the list of paths passed in and returns an array (in a promise) describing what
// what is in each of the paths. This function should work successfully in any case. If an error occurs during the execution of an asynchronous operation,
// then the value for this path will be null. For simplicity, we assume that at least one path for processing is always passed to this function.
// (otherwise, you will have to use the mechanism that is covered in the courses below).

import fs from 'fs/promises';

export const getTypes = (paths) => {
    const initPromise = Promise.resolve([]);

    return paths.reduce((acc, elm) => {
        return acc.then((array) => {
            return fs.stat(elm)
                .then((stats)=> {
                    stats.isDirectory() ? array.push('directory') : array.push('file');
                    return array;
                })
                .catch(() => {
                    array.push(null)
                    return array
                })
        })
    }, initPromise)

}

getTypes(['/etc', '/etc/hosts', '/undefined']).then(console.log);
// ['directory', 'file', null]