// watcher.js
// Реализуйте и экспортируйте асинхронную функцию, которая следит за изменением файла с заданной периодичностью. 
// Функция должна возвращать идентификатор таймера, запущенного внутри.
// Если файл был изменён со времени предыдущей проверки, то необходимо вызвать колбек. 
// Если во время анализа файла (через fs.stat) произошла ошибка, то нужно остановить таймер и вызвать колбек, передав туда ошибку.
// Отслеживание изменений файла должно начинаться с момента вызова функции. Параметры функции:
// - Путь до файла, который нужно отслеживать
// - Период отслеживания
// - Колбек, принимающий аргументом ошибку

// Implement and export an asynchronous function that watches for changes to the file at a specified interval.
// The function should return the ID of the timer running internally.
// If the file has been modified since the previous check, then callback must be called.
// If an error occurs during file analysis (via fs.stat), then you need to stop the timer and call the callback, passing the error there.
// Tracking file changes should start from the moment the function is called. Function parameters:
// - Path to the file to be tracked
// - Tracking period
// - Callback that takes an error as an argument

import fs from 'fs';

const watch = (filename, time, cb) => {
    let startTime = Date.now();
    const id = setInterval(() => {
        fs.stat(filename, (err, stats) => {
            if (err) {
                clearInterval(id);
                return cb(err);
            }
            if (stats.mtimeMs > startTime) {
                startTime = stats.mtimeMs;
                return cb(null);
            }
        })
    }, time);
    return id;
}

const id = watch(filepath, 500, () => {
    console.log('Wow!');
});

setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700);
setTimeout(() => clearInterval(id), 5000); 
