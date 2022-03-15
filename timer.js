// timer.js
// Реализуйте таймер в виде промиса. Функция должна принимать на вход количество миллисекунд и возвращать промис.

// Implement the timer as a promise. The function should take the number of milliseconds as input and return a promise.

const wait = (ms) => new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
})
wait(1000).then(() => console.log('time is over!'));

