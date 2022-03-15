// info.js
// Реализуйте и экспортируйте асинхронную функцию getDirectorySize(), 
// которая считает размер переданной директории не включая поддиректории. 
// Анализ размера файла должен происходить параллельно, для этого воспользуйтесь библиотекой async

// Implement and export the getDirectorySize() asynchronous function,
// which counts the size of the passed directory, not including subdirectories.
// File size analysis should be done in parallel, use the async library for this

import path from 'path';
import fs from 'fs';
import _ from 'lodash'; 
import { map } from 'async';

export const getDirectorySize = (directory, cb) => {

    const getFileSize = (file, callback) => {
        fs.stat(path.join(directory, file), (err, stat) => {
            if (err) {
                return callback(err);
            }
            return callback(null, stat.size);
        });
    }

    return fs.readdir(directory, { withFileTypes: true }, (err, dirFiles) => {
        if (err) {
            return cb(err);
        }
        console.log(dirFiles);
        const files = dirFiles.filter(dir => dir.isFile()).map(file => file.name);
        map(files, getFileSize, (err2, collection) => {
            if (err2) {
                cb(err2);
            }
            return cb(null, _.sumBy(collection))
        })
    })
}

getDirectorySize('/usr/local/bin', (err, size) => {
    console.log(size);
});