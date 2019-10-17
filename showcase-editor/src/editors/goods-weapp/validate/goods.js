import isEmpty from 'lodash/isEmpty';
import { MAXNUM_GOODS_NUM } from '../default-component';

export default value => {
  const errors = {};

  const {
    goods_list: goodsList,
    goods_from: goodsFrom,
    goods,
    goods_number_v2: goodsNumberV2,
  } = value;

  if (goodsFrom === '1') {
    if (isEmpty(goodsList)) {
      errors.goods = '请添加商品分组';
    }
    if (!/^[0-9]*$/.test(goodsNumberV2)) {
      errors.goods_number_v2 = '请填写数字';
    }
    if (goodsNumberV2 > 50) {
      errors.goods_number_v2 = '最多显示50个商品';
    }
    // 显示个数不能为0
    if (+goodsNumberV2 === 0) {
      errors.goods_number_v2 = '请填写大于0的数字';
    }
  } else if (goods.length === 0) {
    errors.goods = '请添加商品';
  } else if (goods.length > MAXNUM_GOODS_NUM) {
    errors.goods = `最多添加${MAXNUM_GOODS_NUM}个商品，其余${goods.length -
      MAXNUM_GOODS_NUM}个商品添加失败`;
  }

  return errors;
};
