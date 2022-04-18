/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-10 14:38:12
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-18 20:49:05
 */

import { useCallback, useEffect, useState } from "react";
import { Table, Button } from "antd";
import Cookies from "js-cookie";
import { request } from "../utils";
import {
  ASWRapper,
  getAntiSpiderToken,
  useAntiSpider,
} from "../components/anti-spider";
import "antd/dist/antd.css";

function HomePage(props) {
  const { font, token, status } = props;
  const [goods, setGoods] = useState(props.goods);

  const getGoods = useCallback(() => {
    // Cookies.set("asc", token);
    request(`http://localhost:3001/goods`, {
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      const { goods } = res.data;
      setGoods(goods);
    });
  }, []);

  useAntiSpider({
    status,
    token,
    font,
    encryptedInfo: Array.from(
      new Set(
        goods?.map((item) => item.price.replace(".", "").split(";")).flat()
      )
    ).filter((item) => !!item),
  });

  return (
    <div className="container" style={{ padding: "10px" }}>
      <div>
        Welcome to Next.js! &emsp;
        <Button type="primary" onClick={getGoods}>
          refresh
        </Button>
      </div>
      <br />
      <Table
        columns={[
          {
            title: "id",
            dataIndex: "index",
          },
          {
            title: "name",
            dataIndex: "name",
          },
          {
            title: "price",
            dataIndex: "price",
            render: (value) => (
              <ASWRapper
                style={{ fontSize: "16px" }}
                encryptedInfo={value}
              />
            ),
          },
        ]}
        rowKey={(item) => item.price}
        dataSource={goods}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { font, token, status } = (await getAntiSpiderToken()) || {};
  const { data: { goods = [] } } = await request(`http://localhost:3001/goods`, {
    credentials: "include",
    mode: "cors",
    headers: {
      cookie: `asc=${token}`,
    },
  });
  return {
    props: {
      font,
      token,
      status,
      goods,
    },
  };
}

export default HomePage;
