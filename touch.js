// touch.js
// Реализуйте и экспортируйте асинхронную функцию touch(), которая создаёт файл, если его не существует.

// Implement and export an asynchronous touch() function that creates a file if it doesn't exist.

import fsp from 'fs/promises';

export const touch = (path) => {
    return fsp.access(path)
        .catch(() => fsp.writeFile(path, ''))
}

touch('/myfile').then(() => console.log('created!'));