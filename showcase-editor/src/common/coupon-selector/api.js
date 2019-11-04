import ajax from 'zan-pc-ajax';

const isSuperStore = _global.isSuperStore;
const BASE_URL = `${isSuperStore ? _global.url.store : _global.url.base}/v4`;

export default {
  // 获取优惠券的列表
  getNewCouponList(data) {
    return ajax({
      method: 'get',
      url: `${BASE_URL}/ump/common/api/coupons`,
      data,
    });
  },
};
