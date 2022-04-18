/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-14 17:54:19
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:46:50
 */
/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-14 17:16:00
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-14 17:33:12
 */

import { useEffect } from "react";

const useInsertFontStyle = (font) => {
  useEffect(() => {
    if (!font) return;
    const content = `
      .m-font {
        font-family: m-font;
      }
      @font-face {
        font-family: 'm-font';
        src:  url(${font});
      }
    `;
    let ele = document.querySelector("mFont");
    if (!ele) {
      ele = document.createElement("style");
      ele.innerHTML = content;
      ele.id = "mFont";
      document.head.appendChild(ele);
    } else {
      ele.innerHTML = content;
    }
  }, []);
};

export { useInsertFontStyle };
