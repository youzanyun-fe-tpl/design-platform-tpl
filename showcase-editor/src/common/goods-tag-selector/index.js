import React, { Component } from 'react';
import { Input } from 'zent';
import head from 'lodash/head';
import has from 'lodash/has';
import { chooseGoodsTag } from 'editorSelectors';
import { EditorCardAdd, ControlGroup, LinkTag, HelpDesc } from 'editor-common';

export default class GoodsSelector extends Component {
  // 添加商品分组
  addGoodTag = () => {
    const { globalConfig, onCustomInputChange } = this.props;
    const self = this;

    chooseGoodsTag({
      config: globalConfig,
      onChoose(list) {
        const goodsList = self.getGoodsList(head(list)) || {};
        onCustomInputChange('goods_list')(goodsList);
      },
    });
  };

  // 格式化商品分组数据，加type='tag'
  getGoodsList = list => {
    if (!has(list, 'type')) {
      list.type = 'tag';
    }
    return list;
  };

  // 删除商品分组
  closeTagCallback = e => {
    e.preventDefault();
    const { onCustomInputChange } = this.props;
    onCustomInputChange('goods_list')({});
    this.setMetaProperty('goods_list', 'touched');
  };

  render() {
    const { value, showError, validation, onInputChange, onInputBlur } = this.props;
    const { goods_list: goodsList = {}, goods_number_v2: goodsNumberV2 } = value;

    return (
      <div className="rc-design-component-goods-editor--goods-tag__controls-card">
        {goodsList.alias ? (
          <>
            <ControlGroup block showError={showError} error={validation.goods_list} bgColored>
              <LinkTag
                colored
                url={goodsList.url}
                onEdit={this.addGoodTag}
                onClose={goodsList.alias ? this.closeTagCallback : false}
              >
                {goodsList.title || '这是一个商品标签'}
              </LinkTag>
            </ControlGroup>
            <ControlGroup
              label="显示个数"
              labelColored
              showError={showError}
              error={validation.goods_number_v2}
              bgColored
            >
              <HelpDesc inline style={{ marginRight: '16px' }}>
                最多显示 50 个
              </HelpDesc>
              <Input
                value={goodsNumberV2}
                name="goods_number_v2"
                onChange={onInputChange}
                onBlur={onInputBlur}
              />
            </ControlGroup>
          </>
        ) : (
          <ControlGroup block showError={showError} error={validation.goods_list} bgColored>
            <EditorCardAdd text="添加商品分组" onAdd={this.addGoodTag} />
          </ControlGroup>
        )}
      </div>
    );
  }
}
