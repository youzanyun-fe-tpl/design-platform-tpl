/**
 * 此文件用来处理默认展示的商品数据
 * 修改此问题请全局搜索微页面组件（注意是否影响其他组件的默认数据展示，例如goods-recommend组件）
 */
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import head from 'lodash/head';

import { DEFAULT_GOODS_IMAGE } from '../common/constants';
import { repeat } from '../common/utils';

/**
 * [transferGoodsList 格式化商品列表]
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
export function transferGoodsList(list) {
  const goodsList = [];
  if (isArray(list) && list.length > 0) {
    forEach(list, item => {
      item.picture = item.picture || '[]';
      const imageInfo = JSON.parse(item.picture);

      goodsList.push({
        id: item.id || '',
        url: item.url || '',
        image_url: item.image_url || '',
        image_id: item.id || '',
        price: item.price !== '0' ? (item.price / 100).toFixed(2) : 0,
        title: item.title || '',
        sub_title: item.sub_title || '',
        goods_type: item.goods_type,
        width: isArray(imageInfo) && imageInfo.length > 0 ? head(imageInfo).width : 0,
        height: isArray(imageInfo) && imageInfo.length > 0 ? head(imageInfo).height : 0,
      });
    });
  }
  return goodsList;
}

export function getAllGoodsByNum(defaultImageUrl, size, num = 4) {
  const lineNum = +size === 0 || +size === 2 ? 1 : 2;

  return repeat(
    {
      id: null,
      url: null,
      image_url: defaultImageUrl || DEFAULT_GOODS_IMAGE,
      price: '99.00',
      title: `这里显示商品名称，最多显示${lineNum}行`,
      sub_title: '这里显示商品描述，最多显示1行',
    },
    num
  );
}
