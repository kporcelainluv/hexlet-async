// retry.js
// Реализуйте и экспортируйте функцию, которая принимает на вход три аргумента:
//
// Количество попыток асинхронного вызова в случае ошибок.
// Функция выполняющая асинхронную задачу. Она должна принимать на вход коллбек, который вызывается внутри (так callback(err, body)) и сигнализирует об успешном или ошибочном завершении.
// Коллбек, который будет вызван после того как функция закончит свою работу. Она принимает на вход ошибку и тело ответа.

// Implement and export a function that takes three arguments as input:
//
// Number of asynchronous call attempts in case of errors.
// A function that performs an asynchronous task. It should take as input a callback that is called internally (so callback(err, body)) and signals success or failure.
// Callback that will be called after the function has completed its work. It accepts an error and a response body as input.

import fs from 'fs';

const retry = (amount, resolve, cb) => {
    return function recall(attempt, amount) {
        return resolve((err, data) => {
            if (err) {
                if (attempt < amount) {
                    return recall(attempt + 1, amount);
                } else {
                    return cb(err);
                }
            }
            return cb(null, data);
        })
    }(1, amount)
}

retry(3, callback =>
    fs.readFile('tes1t.txt', 'utf-8',(err, body) => {
        callback(err, body);
    }), (err, result) => {
    console.log(result);
});