// makeTimer.js
// Реализуйте и экспортируйте функцию, которая возвращает объект-таймер. 
// Таймер "заводится" на определенное время и запускается. Каждые 100 миллисекунд он вызывает колбек, передавая туда два параметра:
// state со значением working и elapsedTime содержащий прошедшее время со старта таймера (в миллисекундах). 
// Когда таймер завершился, то он вызывает тот же колбек с параметром state и значением finished.

// Implement and export a function that returns a timer object.
// The timer "starts" for a certain time and runs. Every 100 milliseconds, it calls the callback, passing two parameters there:
// state with a value of working and elapsedTime containing the elapsed time since the start of the timer (in milliseconds).
// When the timer has ended, it calls the same callback with the state parameter and the finished value.

export const makeTimer = (totalTime, cb) => ({
    step: 100,
    elapsedTime: 0,
    state: 'working',
    start () {
        if (totalTime < this.step) {
            this.state = 'finished';
            return cb({state: this.state, elapsedTime: this.elapsedTime})
        }
      const id = setInterval(() => {
          if (this.elapsedTime >= totalTime) {
              clearInterval(id);
              this.state = 'finished';
          }
          this.elapsedTime = this.elapsedTime += this.step;
          cb({state: this.state, elapsedTime: this.elapsedTime})
          
      }, 100)
    }
    
});


const cb = ({ state, elapsedTime }) => {
    switch (state) {
        case 'working':
            console.log(`Time elapsed: ${elapsedTime}`);
            break;
        case 'finished':
            console.log(`Timer has finished!`);
    }
};

// Создается объект-таймер
const timer = makeTimer(50, cb); // Завели на 300 миллисекунд
timer.start();
// Time elapsed: 100
// Time elapsed: 200
// Time elapsed: 300
// Timer has finished!