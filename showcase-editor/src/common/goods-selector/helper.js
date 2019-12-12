/**
 * 商品/商品分组 数据处理
 */
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import head from 'lodash/head';
import differenceBy from 'lodash/differenceBy';

import { Notify } from 'zent';

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
        // price: item.price !== '0' ? (item.price / 100).toFixed(2) : 0,
        price: item.price || 0,
        origin: item.origin || '',
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

/**
 * [transferSubEntry 格式化商品分组]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function transferSubEntry(list = [], subEntry = []) {
  const diffSubEntry = differenceBy(list, subEntry, 'alias');
  const subEntryData = [];
  if (diffSubEntry.length > 0) {
    forEach(list, item => {
      subEntryData.push({
        alias: item.alias || '',
        goods_number: 6,
        id: item.id || '',
        timestamp: +new Date(),
        title: item.title || '',
        tag_name: item.title || '',
        type: 'tag',
        url: item.url || '',
      });
    });
  }
  return subEntryData;
}

/**
 * [getSubEntry 限制商品分组添加数量]
 * @param  {[type]} subEntry [description]
 * @param  {[type]} num      [description]
 * @return {[type]}          [description]
 */
export function validSubEntry(subEntry, num, type) {
  let subEntryFinal;
  const isTopTagList = type === 'tag_list_top';

  if (num > 0 && subEntry.length > num && isTopTagList) {
    subEntryFinal = subEntry.slice(0, num);
    Notify.error(`最多添加 ${num} 个分组，其余 ${subEntry.length - num} 个分组添加失败`);
  } else {
    subEntryFinal = subEntry;
  }
  return subEntryFinal;
}

/**
 * [updateSubEntryItem 修改商品分组]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
export function updateSubEntryItem(item) {
  const subEntryItem = {
    alias: item.alias || '',
    goods_number: item.goods_number || 6,
    id: item.id || '',
    timestamp: +new Date(),
    title: item.title || '',
    tag_name: item.title || '',
    type: 'tag',
    url: item.url || '',
  };
  return subEntryItem;
}

/**
 * [updateSubEntry 更新subEntry]
 * @param  {[type]} data         [description]
 * @param  {[type]} itemIndex    [description]
 * @param  {[type]} subEntryData [description]
 * @return {[type]}              [description]
 */
export function updateSubEntry(data, itemIndex, subEntryData) {
  if (subEntryData.length > 0) {
    return map(subEntryData, (item, index) => {
      return index === itemIndex ? data : item;
    });
  }
  return subEntryData;
}
