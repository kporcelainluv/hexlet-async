// checker.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход ссылку на страницу какого-то сайта, 
// загружает содержимое этой страницы, извлекает из него ссылки и проверяет их доступность. Функция должна вернуть список битых ссылок.

// Implement and export a function that takes as input a link to a page of some site,
// loads the content of this page, extracts links from it, and checks if they are available. The function should return a list of broken links.

import { URL } from 'url';
import axios from 'axios';

const extractLinks = (content) => {
    const host = 'http://localhost:8080';
    const linkRx = /href="(.+?)"/ig;
    const results = content.matchAll(linkRx);
    return Array.from(results).map((r) => r[1])
        .map((rawLink) => new URL(rawLink, host).toString());
};

export const checker = async (initialLink) => {
    const response = await axios.get(initialLink);
    const links = extractLinks(response.data);
    const request = (link) => axios.get(link).then(() => null).catch(() => link);
    const promises = links.map(request);
    const results = await Promise.all(promises);
    return results.filter((result) => result !== null);
};

const url = 'https://privet.hexlet';
const links = await checker(url);   
console.log(links);
// Гипотетический пример:
// [
//   'https://privet.hexlet/somepage',
//   'https://privet.hexlet/another/page',
// ]