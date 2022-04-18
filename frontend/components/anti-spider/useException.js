/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-17 17:03:05
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:06:10
 */

import { useEffect } from "react";
import { AntiSpider, AntiSpiderMessages } from "./enum";

const useException = (callback) => {
  useEffect(() => {
    const onMessage = (e) => {
      const { source, type } = e.data || {};
      if (source === AntiSpider && type === AntiSpiderMessages.parseError) {
        callback?.();
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);
};

export { useException };
