import ajax from 'zan-pc-ajax';

const isSuperStore = _global.isSuperStore;
const BASE_URL = `${isSuperStore ? _global.url.store : _global.url.base}/v4`;
const appName = _global.appName;
export default {
  // 获取优惠券的列表
  getNewCouponList(data) {
    return ajax({
      method: 'get',
      url: `${BASE_URL}/ump/common/api/coupons?appName=${appName}`,
      data,
    });
  },

  getH5CouponData(ids) {
    const params = {
      ids,
      pageNo: 1,
      pageSize: 10,
      type: 1,
      status: 2,
      source: 'wap_fetch',
      isDisableUnderstock: true,
      isDisableUnshare: true,
    };

    return ajax({
      url: `${BASE_URL}/shop/design/coupon/list.json`,
      type: 'GET',
      data: params,
    });
  },
};
