/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-14 17:52:29
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-18 18:01:45
 */

import { useEffect, useState } from "react";
import { AntiSpiderMessages, AntiSpider } from "./enum";

const ASWRapper = (props) => {
  const { encryptedInfo, style } = props;

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
        __html: parseError ? "--" : encryptedInfo,
      }}
    />
  );
};

export { ASWRapper };
