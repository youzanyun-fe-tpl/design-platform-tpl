import React, { Component } from 'react';

import head from 'lodash/head';
import assign from 'lodash/assign';

import { Input, Radio } from 'zent';
import { chooseGoodsTag } from 'editorSelectors';
import { ControlGroup, LinkTag } from 'editor-common';
import { updateSubEntryItem } from '../helper';
import { DISPLAY_ALL_GOODS } from '../default-component';

export default class SubEntryItem extends Component {
  changeTag = () => {
    const { onChange, index, globalConfig } = this.props;

    chooseGoodsTag({
      config: globalConfig,
      multiple: false,
      onChoose(list) {
        const newSubEntry = updateSubEntryItem(head(list));
        onChange(newSubEntry, index);
      },
    });
  };

  // 修改商品显示个数
  handleGoodsNumChange = e => {
    const { onChange, index, data } = this.props;
    const goodsNum = e.target.value;
    let isShowAll = false;
    if (e.target.name === 'goods_number_radio' && e.target.value === 0) {
      // 显示全部
      isShowAll = true;
    }
    const itemData = assign({}, data, { goods_number: goodsNum, isShowAll });
    onChange(itemData, index);
  };

  // 商品分组名称自定义
  handleTagNameChange = e => {
    const { onChange, index, data } = this.props;
    const tagName = e.target.value || '';
    const itemData = assign({}, data, { tag_name: tagName });
    onChange(itemData, index);
  };

  render() {
    const { data, showError, error, isTopTagList } = this.props;
    const { title, url, goods_number: goodsNumber, tag_name: tagName } = data;
    const goodsNumberRadioValue = goodsNumber === DISPLAY_ALL_GOODS ? goodsNumber : '';
    const goodsNumInputValue = goodsNumber === DISPLAY_ALL_GOODS ? '' : goodsNumber;

    return (
      <div className="decorate-third-goods-editor--tag-list__item">
        <ControlGroup label="商品来源:" normalAlign>
          <LinkTag url={url} onEdit={this.changeTag}>
            {title}
          </LinkTag>
        </ControlGroup>
        <ControlGroup label="菜单名称:" normalAlign>
          <Input
            name="tag_name"
            placeholder="最多10个字"
            maxLength={10}
            value={tagName}
            onChange={this.handleTagNameChange}
          />
        </ControlGroup>
        <ControlGroup
          label="显示个数:"
          showError={showError}
          error={(error && error.goods_num_error) || ''}
          normalAlign
        >
          {isTopTagList ? (
            <Radio.Group value={goodsNumberRadioValue} onChange={this.handleGoodsNumChange}>
              <Radio name="goods_number_radio" value={''}>
                <Input
                  name="goods_number"
                  value={goodsNumInputValue}
                  onChange={this.handleGoodsNumChange}
                  placeholder="自定义"
                  style={{ width: '85px' }}
                />
              </Radio>
              <Radio name="goods_number_radio" value={DISPLAY_ALL_GOODS}>
                全部
              </Radio>
            </Radio.Group>
          ) : (
            <Input
              name="goods_number"
              value={goodsNumber}
              onChange={this.handleGoodsNumChange}
              style={{ width: '60px' }}
            />
          )}
        </ControlGroup>
      </div>
    );
  }
}
