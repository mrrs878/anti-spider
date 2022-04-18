/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-17 17:43:32
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-18 20:21:17
 */

import { useEffect } from "react";
import Cookies from "js-cookie";
import { AntiSpider, AntiSpiderMessages, AntiSpiderStatus } from "./enum";
import { useInsertFontStyle } from "./useInsertFontStyle";
import { useCheckFont } from "./useCheckFont";

/**
 * @typedef IUseAntiSpiderProps
 * @property {string} token 姓名
 * @property {AntiSpiderStatus} status 反爬虫开闭状态
 * @property {string} font 字体地址
 * @property {Array<string>} encryptedInfo 待渲染的加密信息，主要用作检测字体是否加载
 */

/**
 * 整合了检查字体、插入字体样式功能
 * @param {IUseAntiSpiderProps} props
 */
const useAntiSpider = (props) => {
  const { status, token, font, encryptedInfo } = props;
  const [checkFont] = useCheckFont({ status });

  /**
   * 这里是为了演示checkFont功能（多窗口下存在字体解析异常：cookie一样，但加载的字体不一样）
   * 正常情况下，需要在业务接口请求前更新cookie
   */
  Cookies.set("asc", token);

  useEffect(() => {
    if (status !== AntiSpiderStatus.on) {
      window.postMessage({ source: AntiSpider, type: AntiSpiderMessages.fontReady });
      return;
    }
    if (!Array.isArray(encryptedInfo)) {
      throw new TypeError("encryptedInfo must be an array");
    }
    checkFont(encryptedInfo);
  }, [encryptedInfo, status, checkFont]);

  useInsertFontStyle(font);
};

export { useAntiSpider };
