/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-14 22:48:39
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-14 23:37:05
 */

new Offsc

var isSupportFontFamily = function (f, e) {
  if (typeof f != "string") {
    return false;
  }
  var h = "Arial";
  if (f.toLowerCase() === h.toLowerCase()) {
    return true;
  }
  var d = 100;
  var a = 100,
    i = 100;
  var c = document.createElement("canvas");
  var b = c.getContext("2d");
  c.width = a;
  c.height = i;
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function (j) {
    b.clearRect(0, 0, a, i);
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
    var k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function (l) {
      return l != 0;
    });
  };
  return g(h).join("") !== g(f).join("");
};

isSupportFontFamily("aria1l");
