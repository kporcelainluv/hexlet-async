// directorySize.js
// Реализуйте и экспортируйте асинхронную функцию getDirectorySize(), которая считает размер переданной директории (не включая поддиректории).
// Implement and export an asynchronous getDirectorySize() function that counts the size of the passed directory (not including subdirectories).

import path from 'path';
import _ from 'lodash';
import fs from 'fs/promises';

export const getDirectorySize = (filePath) => fs.readdir(filePath)
  .then((elements) => elements.map((e) => fs.stat(path.join(filePath, e))))
  .then((arr) => Promise.all(arr))
    .then((res) => res.map(r => r.isDirectory() ? 0 : r.size))
    .then((res) => _.sumBy(res))

getDirectorySize('/usr/local/bin').then(console.log);