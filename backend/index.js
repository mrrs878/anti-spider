/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-10 15:02:30
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-17 17:35:51
 */

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import Chance from 'chance';
import data from "./assets/data.json";
import { generateFont, getFontByPath, getFontByToken } from './utils/index.js';

const { status } = data;

const app = express();
const chance = new Chance();

const AntiSpiderStatus = {
  on: 0,
  off: 1,
}

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/anti-spider/token/*', (req, res) => {
  const [, uuid] = req.url.match(/\/anti-spider\/token\/(.+)/) || [];
  if (!uuid) {
    res.json({
      code: -1,
      data: {
        status,
        token: '',
        font: '',
      },
    });
    return;
  }
  if (status === AntiSpiderStatus.off) {
    res.json({
      code: 0,
      data: {
        status,
        token: '',
        font: '',
      },
    });
    return;
  }
  const { token, fontPath, expires } = generateFont();
  res.json({
    code: 0,
    data: {
      token,
      font: `http://localhost:3001/font/${fontPath}`,
      status,
    },
  });
});

app.get('/font/*', async (req, res) => {
  const [, fontPath] = req.url.match(/\/font\/(.+)/) || [];

  const font = await getFontByPath(fontPath);
  if (!font || status === AntiSpiderStatus.off) {
    res.json({
      code: 200,
    });
    return;
  }
  const { filePath } = font;
  const cs = fs.createReadStream(filePath);
  cs.on("data", chunk => {
    res.write(chunk);
  })
  cs.on("end", () => {
    res.status(200);
    res.end();
  });
});

app.get('/goods', async (req, res) => {
  const { cookie } = req.headers;
  if (!cookie) {
    res.json({
      code: 200,
      data: {
        goods: [],
      }
    });
    return;
  }

  function translate(price, rule) {
    const withDot = { ...rule, '.': '.' }
    const encoded = price.split('').map((char) => withDot[char]);
    return encoded.join('');
  }
  
  function makeGoods(rule) {
    return new Array(10).fill(0).map(() => {
      let price = `${chance.floating({
        fixed: 2,
        min: 100,
        max: 999,
      })}`;
      if (status === AntiSpiderStatus.on) {
        price = translate(price, rule);
      }
      const name = chance.name({
        middle: true,
      });
      return {
        price,
        name,
      }
    }).map((goods, index) => ({ ...goods, index }));
  }

  if (status === AntiSpiderStatus.off) {
    const goods = makeGoods();
    res.json({
      code: 200,
      data: {
        goods,
      }
    });
    return;
  }

  const [, token] = cookie.match(/asc=(.+)/) || [];
  const font = await getFontByToken(token);
  if (!font) {
    res.json({
      code: 200,
      data: {
        goods: [],
      }
    });
    return;
  }

  const { rule } = font;

  const goods = makeGoods(rule);
  
  res.json({
    code: 0,
    data: {
      goods,
    },
  });
})

app.listen(3001, () => {
  console.log('server is running at 3001');
})