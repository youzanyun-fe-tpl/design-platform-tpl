import React, { Component } from 'react';
import { Icon, Notify } from 'zent';
import { ControlGroup, EditorCard } from 'editor-common';
import { CouponSelector } from 'editorSelectors';
import { MAX_COUPON_NUM } from './constants';
import { transferCouponList, validCoupon } from './helper';
import api from './api';

import './style.scss';

export default class CouponSelectorWrapper extends Component {
  handleCouponChange = list => {
    const { onCustomInputChange } = this.props;
    onCustomInputChange('coupon')(list);
  };

  handleAddCoupon = () => {
    CouponSelector.open({
      fetchApi: this.fetch,
      showStepper: false,
      showStatus: true,
      maxNumLimit: MAX_COUPON_NUM,
      btnLink: window._global.isSuperStore ? '/ump/coupon' : '/v2/ump/tradeincard',
      onChange: this.handleCouponSelectorChange,
    });
  };

  handleCouponSelectorChange = list => {
    const { onCustomInputChange } = this.props;
    const { coupon = [] } = this.props.value;
    const addCouponList = validCoupon(coupon, list, MAX_COUPON_NUM);

    onCustomInputChange('coupon')(addCouponList);
  };

  fetch = ({ keyword, pageNo, pageSize }) => {
    return new Promise(resolve =>
      api
        .getNewCouponList({
          keyword,
          pageNo,
          pageSize,
          productType: 0, // 全部类型的券,1 满减； 2. 折扣券； 3. 随机券
        })
        .then(data => {
          resolve(data);
        })
        .catch(e => Notify.error('获取优惠券列表错误'))
    );
  };

  render() {
    const { value, showError, validation } = this.props;
    const { coupon = [] } = value;

    return (
      <>
        <ControlGroup
          showLabel={false}
          focusOnLabelClick={false}
          showError={showError}
          error={validation.coupon}
          bgColored
          className="coupon-selector"
        >
          <EditorCard
            list={coupon}
            canDelete
            canAdd={coupon.length < MAX_COUPON_NUM}
            addText={
              <div>
                <Icon className="deco-editor-card-add-icon" type="plus" />
                添加优惠券
              </div>
            }
            onChange={this.handleCouponChange}
            onAdd={this.handleAddCoupon}
            selfDefinedText
          >
            {coupon.map((item, index) => {
              return (
                <div key={index} className="decorate-editor_subentry-item clearfix">
                  <i className="decorate-coupon-editor__drag" />
                  {`优惠券: ${item.name}${item.condition ? ` (${item.condition})` : ''}`}
                </div>
              );
            })}
          </EditorCard>
        </ControlGroup>
      </>
    );
  }
}
