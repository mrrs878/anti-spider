/*
 * @Author: mrrs878@foxmail.com
 * @Date: 2022-04-10 14:58:21
 * @LastEditors: mrrs878@foxmail.com
 * @LastEditTime: 2022-04-10 15:00:02
 */

export const request = (...args) => fetch(...args).then((res) => res.json());