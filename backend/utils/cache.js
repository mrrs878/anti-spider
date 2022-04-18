/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-10 15:46:37
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-11 21:11:37
 */

import cacache from 'cacache';
import path from 'path';

const cachePath = path.resolve('tmp/font-cache');

const cache = {};

// export const put = cacache.put.bind(null, cachePath);

// export const get = cacache.get.bind(null, cachePath);

export function put(key, value) {
  cache[key] = value;
}

export function get(key) {
  return Promise.resolve(cache[key]);
}
