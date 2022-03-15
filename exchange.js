// exchange.js
// Реализуйте и экспортируйте асинхронную функцию exchange(), которая обменивает содержимое двух файлов.

// Implement and export an asynchronous exchange() function that exchanges the contents of two files. 

import fs from 'fs/promises';

export const exchange = async (file1, file2) => {
    const data1 = await fs.readFile(file1, 'utf-8');
    const data2 = await fs.readFile(file2, 'utf-8');
    fs.writeFile(file2, data1);
    fs.writeFile(file1, data2);
}

exchange('/myfile1', '/myfile2');