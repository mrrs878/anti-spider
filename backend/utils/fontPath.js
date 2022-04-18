/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-10 15:53:00
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:34:47
 */

import path from 'path';
import Chance from 'chance';
import data from '../assets/data.json';
import { get, put } from './cache.js';

const { rules } = data;

const chance = new Chance();
const fonts = Reflect.ownKeys(rules);

function randomFont() {
  const index = chance.integer({
    max: fonts.length - 1,
    min: 0,
  });
  const fontName = fonts[index];
  return fontName;
}

export function generateFont() {
  const fontPath = chance.string({
    length: 32,
    numeric: true,
  });
  const token = chance.string({
    length: 32,
    numeric: true,
  });
  const fontName = randomFont();
  const filePath = path.resolve(`assets/${fontName}.woff`);
  const rule = rules[fontName];
  const expires = Date.now() + 1000 * 30

  put(token, JSON.stringify({
    rule,
    expires,
  }));

  put(fontPath, JSON.stringify({
    filePath,
  }));

  return {
    fontPath,
    token,
  }
}

export async function getFontByToken(token) {
  const res = (await get(token) )|| '{}';
  console.log('res', res);
  const font = JSON.parse(res);
  return font;
}

export async function getFontByPath(fontPath) {
  const res = (await get(fontPath) )|| '{}';
  const font = JSON.parse(res);
  return font;
}
