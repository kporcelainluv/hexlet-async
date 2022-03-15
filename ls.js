// ls.js
// Реализуйте и экспортируйте функцию, которая принимает на вход путь (абсолютный или относительный) и возвращает 
// информацию о файлах и директориях, расположенных по этому пути. Данные возвращаются в виде массива объектов,
// где каждый элемент — это информация о конкретном файле: его путь и описание доступов (stat.mode). 
// Объекты в массиве должны быть отсортированы по имени файла.

// Implement and export a function that takes a path (absolute or relative) as input and returns
// information about files and directories located in this path. The data is returned as an array of objects,
// where each element is information about a specific file: its path and access description (stat.mode).
// Objects in array should be sorted by filename.

import path from 'path';
import fs from 'fs/promises';

export const ls = async (p) => {
    try {
        const paths = await fs.readdir(p)
            .then(files => files.map(elm => path.join(p, elm)))

        const promises = paths.map(p => fs.stat(p))
        const modes = await Promise.all(promises).then(stats => stats.map(s => s.mode))
        return paths.map((p, index) => ({ 'filepath': path.resolve(p), 'mode': modes[index] }))
    }
    catch (e) {
        return fs.stat(p).then((s) => ([{ 'filepath': path.resolve(p), 'mode': s.mode }]))
    }
}

await ls('/var');
// [
//   { filepath: '/var/local', mode: 17917 },
//   { filepath: '/var/lock', mode: 17407 },
//   { filepath: '/var/log', mode: 16877 },
// ];

await ls('/etc/passwd');
// [{ filepath: '/etc/passwd', mode: 33188 }];

await ls('../../../../etc/passwd');
// [{ filepath: '/etc/passwd', mode: 33188 }];
