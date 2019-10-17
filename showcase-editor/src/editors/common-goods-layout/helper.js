import { SIZE_TYPE_MAP, LAYOUT_MAP } from './constants';

/**
 * 列表模式
 * @param layout
 * @returns {number}
 */
export function isLayoutList(layout) {
  return +layout === LAYOUT_MAP.LIST;
}

/**
 * 一行两个
 * @param layout
 * @returns {boolean}
 */
export function isLayoutSmall(layout) {
  return +layout === LAYOUT_MAP.SMALL;
}

/**
 * 一行三个或横向滚动
 * @param layout
 * @returns {boolean}
 */
export function isLayoutThreeOrSwipe(layout) {
  return +layout === LAYOUT_MAP.THREE || +layout === LAYOUT_MAP.SWIPE;
}

/**
 * 左侧单独布局
 * @param layout
 * @param sizeType
 * @returns {boolean}
 */
export function isLayoutTagLeft(layout, sizeType) {
  return +layout === LAYOUT_MAP.LIST && +sizeType === SIZE_TYPE_MAP.TAG_LEFT;
}

/**
 * 瀑布流
 * @param sizeType
 * @returns {boolean}
 */
export function isWaterFall(sizeType) {
  return +sizeType === SIZE_TYPE_MAP.WATERFALL;
}

/**
 * 促销
 * @param sizeType
 * @returns {boolean}
 */
export function isPromotion(sizeType) {
  return +sizeType === SIZE_TYPE_MAP.PROMOTION;
}

/**
 * 是否展示购买按钮
 * @param sizeType
 * @returns {boolean}
 */
export function isShowBuyButton(sizeType) {
  return !isPromotion(sizeType);
}

/**
 * 列表样式和促销样式禁用标题切换
 * @param layout
 * @param sizeType
 * @returns {boolean}
 */
export function isDisabledTitle(layout, sizeType) {
  return +layout === LAYOUT_MAP.LIST || isPromotion(sizeType);
}

/**
 * 判断是否显示 显示比例选项(3:2 1:1)
 * 瀑布流不展示显示比例
 * @param {*} type
 */
export function isShowDisplayScale(sizeType) {
  return !isWaterFall(sizeType);
}

/**
 * 是否展示图片填充方式
 * @param sizeType
 * @returns {boolean}
 */
export function isShowImageFillStyle(sizeType) {
  return !isWaterFall(sizeType);
}

/**
 * 是否展示对齐方式
 * @param layout
 * @returns {boolean}
 */
export function isShowTextAlignStyle(layout) {
  return +layout !== LAYOUT_MAP.LIST;
}

/**
 * 商品列表样式切换
 * @param layout
 * @param sizeType
 * @returns {{size: string, display_scale: string, show_sub_title: string}}
 */
export function layoutStyleChange(layout, sizeType) {
  const params = {
    size: layout + '',
    display_scale: layout !== LAYOUT_MAP.BIG ? '1' : '0',
    show_sub_title: isLayoutSmall(layout) || isLayoutThreeOrSwipe(layout) ? '0' : '1',
  };

  // 一行三个、横向滑动：默认购买按钮不显示
  if (isLayoutThreeOrSwipe(layout)) {
    params.buy_btn = '0';
    params.buy_btn_type = '1';
  } else {
    params.buy_btn = '1';
  }

  // 列表样式：选中标题且居左展示，且不能取消，
  if (layout === LAYOUT_MAP.LIST) {
    params.title = '1';
    params.text_align_type = 'left';
  }

  // 当之前选了一行两个促销或瀑布流时，切换到其他样式需要默认选择无边白底
  if (!isLayoutSmall(layout) && (isWaterFall(sizeType) || isPromotion(sizeType))) {
    params.size_type = '0';
  }
  return params;
}

/**
 * 商品样式切换
 * @param sizeType
 * @returns {{size_type: *}}
 */
export function sizeTypeChange(sizeType) {
  const params = {
    size_type: sizeType,
  };

  if (isPromotion(sizeType)) {
    params.price = '1';
    params.buy_btn = '1';
    params.title = '0';
    params.show_sub_title = '0';
    params.text_align_type = 'left';
  }

  return params;
}

/**
 * 对齐方式修改
 * @param layout
 * @param textAlign
 * @returns {{text_align_type: *}}
 */
export function textAlignTypeChange(layout, textAlign) {
  const params = {
    text_align_type: textAlign,
  };

  if (textAlign === 'center') {
    params.buy_btn_type = '3';
    params.button_text = '马上抢';
  }

  if (isLayoutThreeOrSwipe(layout)) {
    if (textAlign === 'center') {
      params.buy_btn = '0';
    } else {
      params.buy_btn_type = '1';
    }
  }
  return params;
}

/**
 * check value
 * @param value
 * @returns {string}
 */
export function getCheckBoxValue(value) {
  return value ? '显示' : '不显示';
}
