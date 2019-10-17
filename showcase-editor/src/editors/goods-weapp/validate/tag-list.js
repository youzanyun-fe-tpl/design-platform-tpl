import some from 'lodash/some';
import map from 'lodash/map';

/**
 * 校验显示个数
 * @param {*} num
 */
const validateGoodsNum = ({ goods_number: num, isShowAll }) => {
  let errorMsg = '';
  if (isShowAll) return errorMsg;
  if (!/^[0-9]\d?$|^100$/.test(num)) {
    errorMsg = '请填写100以内的数字';
  }
  // 显示个数不能为0
  if (+num === 0) {
    errorMsg = '请填写大于0的数字';
  }
  return errorMsg;
};

export default value => {
  const errors = {};

  const { sub_entry: subEntry = [] } = value;

  if (subEntry.length === 0) {
    errors.subEntry = '请选择商品分组';
  }

  const isInvalid = some(subEntry, item => {
    return validateGoodsNum(item);
  });

  if (isInvalid) {
    errors.sub_entry_item = map(subEntry, item => {
      return {
        goods_num_error: validateGoodsNum(item),
      };
    });
  }

  return errors;
};
