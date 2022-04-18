import { checkFont } from "./utils";
import { AntiSpiderMessages, AntiSpider } from "./enum";

const useCheckFont = () => {
  const check = (phrase, options = { timeout: 8192 }) => {
    function doCheck(t) {
      let tid = setTimeout(() => {
        clearTimeout(tid);
        tid = null;
        const res = checkFont("m-font", phrase);
        if (res) {
          // success!
          window.postMessage({ source: AntiSpider, type: AntiSpiderMessages.fontReady })
        }
        if (!res && (t << 1 < options.timeout)) {
          doCheck(t << 1);
        }
        if (!res && (t << 1) >= options.timeout) {
          window.postMessage({
            source: AntiSpider,
            type: AntiSpiderMessages.parseError,
          });
        }
      }, t);
    }

    doCheck(2 << 5);
  };

  return [check];
};

export { useCheckFont };
