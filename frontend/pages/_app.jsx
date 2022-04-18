/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-17 15:23:30
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:10:03
 */

import { Modal } from "antd";
import { useAntiSpiderException } from "../components/anti-spider";

function MyApp({ Component, pageProps }) {
  useAntiSpiderException(() => {
    Modal.info({
      content: "商品信息加载失败，请刷新页面重试",
      onOk: () => window.location.reload(),
    });
  });

  return <Component {...pageProps} />;
}

export default MyApp;
