import React, { Component } from 'react';

import { Checkbox, Slider } from 'zent';
import { ControlGroup, RadioButton, Control, Divider } from 'editor-common';
import BuyButton from './components/buy-button';

import { booleanToString, numberToBoolean } from '../../utils';

import * as Helper from './helper';

import './style/style.scss';

export default class GoodsStyleEditor extends Component {
  // 列表样式change
  onLayoutStyleChange = e => {
    const { onChange, value = {} } = this.props;
    const layout = e.target.value;
    const { size_type: sizeType } = value;

    const params = Helper.layoutStyleChange(+layout, +sizeType);
    onChange(params);
  };

  onCustomInputChange = name => value => {
    const { onChange } = this.props;
    onChange({
      [name]: value,
    });
  };

  // 显示样式change
  onSizeTypeChange = e => {
    const { onChange } = this.props;
    const sizeType = e.target.value;

    const params = Helper.sizeTypeChange(sizeType);

    onChange(params);
  };

  onBooleanToStringChange = name => e => {
    const { onChange } = this.props;
    const value = e.target.checked;

    onChange({
      [name]: booleanToString(value),
    });
  };

  onTextAlignTypeChange = e => {
    const { onChange, value = {} } = this.props;
    const textAlign = e.target.value;
    const size = +value.size;
    const params = Helper.textAlignTypeChange(size, textAlign);

    onChange(params);
  };

  render() {
    const {
      value,
      onInputChange,
      priceComponent,
      extraComponent,
      onChange,
      hideSubTitle,
      hideTitle,
      hideBuyButton,
    } = this.props;
    const {
      display_scale: displayScale,
      size,
      page_margin: pageMargin = 15,
      goods_margin: goodsMargin = 10,
      text_align_type: textAlignType = 'left',
      text_style_type: textStyleType = '1',
      border_radius_type: borderRadiusType = '1',
      size_type: sizeType,
      title,
      show_sub_title: subTitle,
      price,
      image_fill_style: imageFillStyle,
    } = value;

    const showTitle = numberToBoolean(title);
    const showSubTitle = numberToBoolean(subTitle);
    const showPrice = numberToBoolean(price);

    return (
      <div className="rc-design-component-common-goods-layout-editor">
        {!Helper.isLayoutTagLeft(size, sizeType) && (
          <>
            <Control
              label="列表样式"
              block
              valueMap={{
                0: '大图模式',
                1: '一行两个',
                5: '一行三个',
                3: '详细列表',
                2: '一大两小',
                6: '横向滑动',
              }}
              name="size"
              options={[
                { value: '0', icon: 'big' },
                { value: '1', icon: 'small' },
                { value: '5', icon: 'three' },
                { value: '3', icon: 'list' },
                { value: '2', icon: 'hybrid' },
                { value: '6', icon: 'swipe' },
              ]}
              value={size}
              componentProps={{ block: true }}
              onChange={this.onLayoutStyleChange}
            />
          </>
        )}
        <Divider />
        {!Helper.isLayoutTagLeft(size, sizeType) && (
          <ControlGroup
            className="rc-design-component-common-goods-layout-editor__size-type"
            label="商品样式"
            block
          >
            <RadioButton.Group value={sizeType} onChange={this.onSizeTypeChange} perLine={4}>
              <RadioButton name="size_type" value="0">
                无边白底
              </RadioButton>
              <RadioButton name="size_type" value="7">
                卡片投影
              </RadioButton>
              <RadioButton name="size_type" value="5">
                描边白底
              </RadioButton>
              <RadioButton name="size_type" value="2">
                无边透明底
              </RadioButton>
              {Helper.isLayoutSmall(size) && [
                <RadioButton key={3} name="size_type" value="3">
                  促销
                </RadioButton>,
                <RadioButton key={1} name="size_type" value="1">
                  瀑布流
                </RadioButton>,
              ]}
            </RadioButton.Group>
          </ControlGroup>
        )}

        <Control
          label="商品倒角"
          valueMap={{
            1: '直角',
            2: '圆角',
          }}
          name="border_radius_type"
          options={[{ value: '1', icon: 'corner-straight' }, { value: '2', icon: 'corner-round' }]}
          value={borderRadiusType}
          onChange={onInputChange}
        />

        {Helper.isShowDisplayScale(sizeType) && (
          <Control
            label="图片比例"
            valueMap={{
              0: '3:2',
              1: '1:1',
              2: '3:4',
              3: '16:9',
            }}
            name="display_scale"
            options={[
              { value: '0', icon: '3-2', disabled: Helper.isLayoutList(size) },
              { value: '1', icon: '1-1' },
              { value: '2', icon: '3-4', disabled: Helper.isLayoutList(size) },
              { value: '3', icon: '16-9', disabled: Helper.isLayoutList(size) },
            ]}
            value={displayScale}
            onChange={onInputChange}
          />
        )}

        {Helper.isShowImageFillStyle(sizeType) && (
          <Control
            label="图片填充"
            valueMap={{
              1: '填充',
              2: '周边留白',
            }}
            name="image_fill_style"
            options={[{ value: '1', icon: 'img-cover' }, { value: '2', icon: 'img-contain' }]}
            value={imageFillStyle}
            onChange={onInputChange}
          />
        )}

        <Control
          label="文本样式"
          valueMap={{
            1: '常规体',
            2: '加粗体',
          }}
          name="text_style_type"
          options={[{ value: '1', icon: 'font-regular' }, { value: '2', icon: 'font-bold' }]}
          value={textStyleType}
          onChange={onInputChange}
        />

        <Control
          label="文本对齐"
          valueMap={{
            left: '左对齐',
            center: '居中对齐',
          }}
          name="text_align_type"
          options={[
            { value: 'left', icon: 'align-left' },
            { value: 'center', icon: 'align-center', disabled: Helper.isLayoutList(size) },
          ]}
          value={textAlignType}
          onChange={this.onTextAlignTypeChange}
        />

        <ControlGroup label="页面边距" normalAlign>
          <Slider
            min={0}
            max={30}
            value={Number(pageMargin)}
            onChange={this.onCustomInputChange('page_margin')}
          />
        </ControlGroup>

        <ControlGroup label="商品间距" normalAlign>
          <Slider
            min={0}
            max={30}
            value={Number(goodsMargin)}
            onChange={this.onCustomInputChange('goods_margin')}
          />
        </ControlGroup>

        <Divider />

        {!hideTitle && (
          <ControlGroup label="商品名称" value={Helper.getCheckBoxValue(showTitle)}>
            <Checkbox
              checked={showTitle}
              disabled={Helper.isDisabledTitle(size, sizeType)}
              name="title"
              onChange={this.onBooleanToStringChange('title')}
            />
          </ControlGroup>
        )}

        {!hideSubTitle && (
          <ControlGroup label="商品描述" value={Helper.getCheckBoxValue(showSubTitle)}>
            <Checkbox
              checked={showSubTitle}
              disabled={Helper.isPromotion(sizeType)}
              name="show_sub_title"
              onChange={this.onBooleanToStringChange('show_sub_title')}
            />
          </ControlGroup>
        )}

        {priceComponent ? (
          priceComponent()
        ) : (
          <ControlGroup label="商品价格" value={Helper.getCheckBoxValue(showPrice)}>
            <Checkbox
              checked={showPrice}
              name="price"
              onChange={this.onBooleanToStringChange('price')}
            />
          </ControlGroup>
        )}

        {!hideBuyButton && <BuyButton value={value} onChange={onChange} />}

        {extraComponent && extraComponent()}
      </div>
    );
  }
}
