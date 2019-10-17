import React from 'react';

import assign from 'lodash/assign';
import head from 'lodash/head';
import get from 'lodash/get';
import { Radio, Input, Pop, Icon, Notify, Checkbox } from 'zent';
import {
  Divider,
  EditorCard,
  ControlGroup,
  RadioButton,
  ComponentTitle,
  Control,
} from 'editor-common';
import { MAX_COUPON_NUM, transferCouponList, mergeCouponList, validCoupon } from './helper';
import { DesignEditor } from '../../common/editor-base';
import { THEME_LIST, COUPON_STYLE, COUPON_COLOR } from './constants';
import * as Utils from '../../utils';

import { CouponSelector } from 'editorSelectors';
import api from './api';

const RadioGroup = Radio.Group;

export default class CouponEditor extends DesignEditor {
  constructor(props) {
    super(props);
    this.state = assign({}, this.state, {
      couponNumRadioValue: props.value.coupon_num === '' || +props.value.coupon_num !== 0 ? 1 : 0,
      couponNumInputValue: +props.value.coupon_num !== 0 ? props.value.coupon_num : '',
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value.coupon_num !== nextProps.value.coupon_num) {
      this.setState({
        couponNumRadioValue:
          nextProps.value.coupon_num === '' || +nextProps.value.coupon_num !== 0 ? 1 : 0,
        couponNumInputValue: +nextProps.value.coupon_num !== 0 ? nextProps.value.coupon_num : '',
      });
    }
  }

  handleCouponSourceChange = e => {
    const { onChange } = this.props;
    const { target } = e;
    const { name, value } = target;

    if (value === '0') {
      onChange({
        [name]: value,
        coupon: [],
      });
    } else {
      onChange({
        [name]: value,
        coupon_num: 0,
      });
    }

    this.setMetaProperty(name, 'dirty');
  };

  handleCouponChange = list => {
    this.onCustomInputChange('coupon')(list);
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
    const ids = list.map(couponItem => couponItem.id).join(',');

    api.getH5CouponData(ids).then((coupons = []) => {
      const { coupon = [] } = this.props.value;
      const addCouponList = validCoupon(
        coupon,
        transferCouponList(mergeCouponList(list, coupons)),
        MAX_COUPON_NUM
      );

      this.onCustomInputChange('coupon')(addCouponList);
    });
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

  handleCheckboxChange = e => {
    const { onChange } = this.props;
    const { target } = e;
    const { name, checked } = target;

    onChange({
      [name]: Utils.booleanToString(checked),
    });
    this.setMetaProperty(name, 'dirty');
  };

  changeThemeColor = ev => {
    const { onChange } = this.props;
    onChange({
      coupon_color: ev.target.value,
    });
    this.setMetaProperty('coupon_color', 'dirty');
  };

  render() {
    const { value, showError, validation } = this.props;
    const {
      coupon_source: couponSource,
      hide_unshared_coupon: hideUnsharedCoupon,
      hide_empty_coupon: hideEmptyCoupon,
      coupon,
      coupon_style: couponStyle = 1,
      coupon_color: couponColor = get(head(THEME_LIST), 'id', 1),
    } = value;
    const hideUnsharedCouponBoolean = Utils.numberToBoolean(hideUnsharedCoupon);
    const hideEmptyCouponBoolean = Utils.numberToBoolean(hideEmptyCoupon);

    return (
      <div className="third-coupon-editor">
        <ComponentTitle
          name="优惠券"
          noticeMsg={`最多添加10张优惠券${
            coupon.length >= 2 ? ', 拖动选中的优惠券可对其排序' : ''
          }`}
          url="https://help.youzan.com/qa?cat_sys=K#/menu/2211/detail/11755?_k=z36mod"
          withMargin
        />

        <ControlGroup
          className="decorate-coupon-editor__source"
          label="添加方式"
          focusOnLabelClick={false}
        >
          <RadioGroup value={couponSource} onChange={this.handleCouponSourceChange}>
            <Radio name="coupon_source" value="1">
              手动添加
            </Radio>
            <Radio name="coupon_source" value="0">
              自动获取
              <Pop
                trigger="hover"
                position="bottom-right"
                content="系统自动获取店铺优惠券，新创建的券排在前面"
                centerArrow
              >
                <Icon type="help-circle" />
              </Pop>
            </Radio>
          </RadioGroup>
        </ControlGroup>
        {+couponSource === 0 && (
          <div className="controls-card">
            <ControlGroup
              label="券活动数"
              labelAlign="top"
              className="decorate-coupon-editor__coupon-num"
              focusOnLabelClick={false}
              bgColored
              block
            >
              <ControlGroup
                showLabel={false}
                focusOnLabelClick={false}
                showError={showError}
                error={validation.coupon_num}
                block
              >
                <RadioGroup
                  block
                  value={this.state.couponNumRadioValue}
                  onChange={this.onInputChange}
                >
                  <Radio name="coupon_num" value={0}>
                    全部
                  </Radio>
                  <Radio name="coupon_num" value={1}>
                    <Input
                      name="coupon_num"
                      value={this.state.couponNumInputValue}
                      placeholder="请输入显示的券活动数"
                      onChange={this.onInputChange}
                      onBlur={this.onInputBlur}
                    />
                  </Radio>
                </RadioGroup>
              </ControlGroup>

              <ControlGroup
                label="隐藏不可分享链接的优惠券"
                value={hideUnsharedCouponBoolean ? '隐藏' : '不隐藏'}
              >
                <Checkbox
                  name="hide_unshared_coupon"
                  checked={hideUnsharedCouponBoolean}
                  onChange={this.handleCheckboxChange}
                />
              </ControlGroup>
            </ControlGroup>
          </div>
        )}
        {+couponSource === 1 && (
          <ControlGroup
            showLabel={false}
            focusOnLabelClick={false}
            showError={showError}
            error={validation.coupon}
            bgColored
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
        )}

        <Divider />

        <ControlGroup label="样式" value={COUPON_STYLE[couponStyle]}>
          <RadioButton.Group value={couponStyle} onChange={this.onInputChange}>
            <RadioButton name="coupon_style" value={1} icon="coupon-1" tip={COUPON_STYLE[1]} />
            <RadioButton name="coupon_style" value={2} icon="coupon-2" tip={COUPON_STYLE[2]} />
            <RadioButton name="coupon_style" value={3} icon="coupon-3" tip={COUPON_STYLE[3]} />
            <RadioButton name="coupon_style" value={4} icon="coupon-4" tip={COUPON_STYLE[4]} />
          </RadioButton.Group>
        </ControlGroup>

        <Control
          label="颜色"
          valueMap={COUPON_COLOR}
          componentProps={{ round: true }}
          options={THEME_LIST.map(({ id, value }) => ({
            value: id,
            children: <div className="coupon-color" style={{ backgroundColor: `${value}` }} />,
          }))}
          value={couponColor}
          onChange={this.changeThemeColor}
        />

        <ControlGroup
          label="隐藏已抢完券"
          value={hideEmptyCouponBoolean ? '隐藏' : '不隐藏'}
          helpDesc="当页面无可显示的优惠券时，优惠券区块将隐藏"
        >
          <Checkbox
            name="hide_empty_coupon"
            checked={hideEmptyCouponBoolean}
            onChange={this.handleCheckboxChange}
          />
        </ControlGroup>
      </div>
    );
  }

  // 组件的描述
  static designDescription = <span className="weapp-design-components-new-label">优惠券</span>;

  // 添加组件时调用，用来获取新组件的初始值
  static getInitialValue() {
    return {
      coupon: [], // 优惠券数组
      coupon_source: '1', // 数据来源 0. 自动获取；1. 手动获取
      coupon_num: 0, // 优惠券最多展示数量
      hide_unshared_coupon: '0', // 是否隐藏不能分享券
      hide_empty_coupon: '1', // 是否隐藏库存为空的券
      coupon_style: 1, // 优惠券样式
      coupon_color: 1, // 优惠券颜色
      type: 'extension-coupon',
    };
  }

  static info = {
    icon: 'https://img.yzcdn.cn/public_files/2019/02/12/6366c7167fc140370d6734b9fbfdf3fe.png',
    type: 'extension-coupon',
    name: '优惠券',
    maxNum: 5,
    usedNum: 0,
    extensionImage:
      'https://img.yzcdn.cn/public_files/2019/08/27/30e3e7714230a0b8841f30850784314c.png',
  };

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { coupon, coupon_source: couponSource, coupon_num: couponNum } = value;
      if (couponSource === '1' && coupon.length === 0) {
        errors.coupon = '请选择优惠券';
      }

      if (!/^\d$|^10$/.test(couponNum)) {
        errors.coupon_num = '请填写10以内的数字';
      }

      resolve(errors);
    });
  }
}
