/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-17 15:36:54
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:30:47
 */

import { v4 as uuidv4 } from "uuid";
import { request } from "../../utils/http";

/**
 * 获取字体、token
 * @param {void}
 * @return {Promise<{ token: string; font: string, status: number }>}
 */
export async function getAntiSpiderToken() {
  const uuid = uuidv4();
  const { code, data } = await request(
    `http://localhost:3001/anti-spider/token/${uuid}`
  );
  return data;
}

/**
 * 检测字体是否存在
 * @param {string} font 字体名称
 * @param {Array<string>} phrase 待匹配的字符
 * @return {boolean} 是否存在该字体
 */
export function checkFont(font, phrase) {

  if (document.fonts) {
    const fonts = [...document.fonts];
    if (fonts.findIndex((f) => f.family === font) === -1) {
      console.log('font dose not exist');
      return false;
    }
  }

  let node = document.createElement("span");
  const sizes = [];

  function checkChar(char) {
    node.style.fontFamily = "sans-serif";
    
    node.innerHTML = char;

    const size = {};

    size.withoutFont = {
      width: node.offsetWidth,
      height: node.offsetHeight,
    };

    node.style.fontFamily = font + ", sans-serif";

    size.withFont = {
      width: node.offsetWidth,
      height: node.offsetHeight,
    };

    sizes.push(size);
  }

  node.style.position = "absolute";
  node.style.left = "-10000px";
  node.style.top = "-10000px";

  node.style.fontSize = "300px";

  node.style.fontFamily = "sans-serif";
  node.style.fontVariant = "normal";
  node.style.fontStyle = "normal";
  node.style.fontWeight = "normal";
  node.style.letterSpacing = "0";

  document.body.appendChild(node);

  phrase.forEach(checkChar);

  console.log(sizes);

  const res =
    node &&
    sizes.reduce(
      (acc, cur) =>
        acc &&
        (cur.withFont.width !== cur.withoutFont.width ||
          cur.withFont.height !== cur.withoutFont.height),
      true
    );
  node.parentNode.removeChild(node);
  node = null;
  return res;
}
