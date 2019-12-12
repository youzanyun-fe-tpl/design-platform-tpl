import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import { Notify } from 'zent';

export function getDefaultCoupon() {
  const data = [
    {
      id: 1,
      origin_value: 10001,
      disabled: false,
    },
    {
      id: 2,
      discount: 8.8,
      is_invalid: 1,
      is_at_least: true,
      origin_at_least: 29990,
      preferential_type: 2,
      disabledText: '已领取',
    },
    ...Array.from({ length: 2 }).map(() => ({
      id: 3,
      discount: 8.8,
      is_invalid: 1,
      preferential_type: 2,
      disabledText: '已领取',
    })),
  ];

  return data;
}

export function transferCouponList(list) {
  const couponList = [];
  if (isArray(list) && list.length > 0) {
    forEach(list, item => {
      const {
        condition = 0,
        id = 0,
        title: name = '',
        denominations = 0,
        discount = 0,
        preferential_type: preferentialType = 1,
        preferentialDesc = '',
        fetchUrl = '',
      } = item;
      const atLeast = (condition / 100).toFixed(2) || 0;
      const originAtLeast = Math.round(Number(atLeast) * 100) || 0;

      couponList.push({
        id: id || 0,
        name,
        origin_value: denominations || 0,
        discount: discount || 0,
        preferential_type: preferentialType || 1,
        is_at_least: condition > 0,
        at_least: atLeast,
        origin_at_least: originAtLeast,
        condition: preferentialDesc,
        fetchUrl,
      });
    });
  }
  return couponList;
}

export function mergeCouponList(oldList, newList) {
  const resultList = [];

  if (isArray(oldList) && isArray(newList)) {
    oldList.forEach(item => {
      newList.forEach(newItem => {
        if (newItem.id === item.id) {
          resultList.push({
            ...item,
            ...newItem,
          });
        }
      });
    });
  }

  return resultList;
}

export function validCoupon(originCoupon, coupon, num) {
  const filterCoupon = coupon.filter(item => {
    return originCoupon.every(originItem => {
      return item.id !== originItem.id;
    });
  });
  const mergeCoupon = originCoupon.concat(filterCoupon);
  let couponFinal;
  if (num > 0 && mergeCoupon.length > num) {
    couponFinal = mergeCoupon.slice(0, num);
    Notify.error('你添加的优惠券数量超过最大值，已经自动删除多余的优惠券。');
  } else {
    couponFinal = mergeCoupon;
  }
  return couponFinal;
}
