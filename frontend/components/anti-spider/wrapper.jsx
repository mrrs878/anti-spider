/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-14 17:52:29
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:39:54
 */

import { useEffect, useState } from "react";
import { AntiSpiderMessages, AntiSpider, AntiSpiderStatus } from "./enum";

const ASWRapper = (props) => {
  const { encryptedInfo, style, status } = props;

  const [parseError, setParseError] = useState(true);

  useEffect(() => {
    const onMessage = (e) => {
      const { source, type } = e.data || {};
      if (source === AntiSpider && type === AntiSpiderMessages.parseError) {
        setParseError(true);
      }
      if (source === AntiSpider && type === AntiSpiderMessages.fontReady) {
        setParseError(false);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <span
      className="m-font"
      style={style}
      dangerouslySetInnerHTML={{
        __html:
          status === AntiSpiderStatus.on && parseError ? "--" : encryptedInfo,
      }}
    />
  );
};

export { ASWRapper };
