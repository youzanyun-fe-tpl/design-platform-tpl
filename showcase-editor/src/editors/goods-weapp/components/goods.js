import React, { Component } from 'react';

import head from 'lodash/head';
import has from 'lodash/has';
import concat from 'lodash/concat';

import { chooseGoods } from 'editorSelectors';
import { chooseGoodsTag } from 'editorSelectors';
import { Input, Radio } from 'zent';
import { ControlGroup, EditorCard, GoodsImage, LinkTag, HelpDesc } from 'editor-common';

import { transferGoodsList } from '../helper';

import { MAXNUM_GOODS_NUM } from '../default-component';

export default class GoodsHeader extends Component {
  // 添加商品
  addGoodImage = () => {
    const { globalConfig, onCustomInputChange } = this.props;
    const { goods } = this.props.value;
    const self = this;
    let addGoodsList;

    chooseGoods({
      config: globalConfig,
      multiple: true,
      onChoose(list) {
        addGoodsList = concat(goods, transferGoodsList(list));
        const goodsList = self.handleMaxNumGoods(addGoodsList);
        onCustomInputChange('goods')(goodsList);
      },
    });
  };

  /**
   * 最大商品数量限制
   */
  handleMaxNumGoods = list => {
    let remainList;
    if (list.length > MAXNUM_GOODS_NUM) {
      remainList = list.slice(0, MAXNUM_GOODS_NUM);
    } else {
      remainList = list;
    }
    return remainList;
  };

  // 修改商品选择
  handleChange = list => {
    const { onCustomInputChange } = this.props;
    const goodsList = this.handleMaxNumGoods(list);
    onCustomInputChange('goods')(goodsList);
  };

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

  handleGoodsFromChange = e => {
    const { onChange } = this.props;
    const goodsFrom = e.target.value;

    if (goodsFrom === '0') {
      onChange({
        goods_from: goodsFrom,
        goods_list: {},
        goods_number_v2: 6,
      });
    } else {
      onChange({
        goods_from: goodsFrom,
        goods_list: {},
        goods: [],
        goods_number_v2: 6,
      });
    }
  };
  render() {
    const { value, globalConfig, showError, validation, onInputChange, onInputBlur } = this.props;
    const {
      goods,
      goods_list: goodsList = {},
      goods_from: goodsFrom,
      goods_number_v2: goodsNumberV2,
    } = value;

    return (
      <>
        <ControlGroup label="添加商品" required style={{ padding: '30px 16px 10px' }}>
          <Radio.Group value={goodsFrom} onChange={this.handleGoodsFromChange}>
            <Radio name="goods_from" value="0">
              商品
            </Radio>
            <Radio name="goods_from" value="1">
              选择分组
            </Radio>
          </Radio.Group>
        </ControlGroup>

        {goodsFrom === '0' && (
          <div className="controls-card">
            <ControlGroup
              showLabel={false}
              showError={showError}
              error={validation.goods}
              block
              bgColored
            >
              <EditorCard
                list={goods}
                canDelete
                canAdd={goods.length < MAXNUM_GOODS_NUM}
                isInline
                onChange={this.handleChange}
                onAdd={this.addGoodImage}
              >
                {goods.map(item => (
                  <GoodsImage globalConfig={globalConfig} key={item.id} data={item} />
                ))}
              </EditorCard>
            </ControlGroup>
          </div>
        )}

        {goodsFrom === '1' && (
          <div className="decorate-third-goods-editor--goods-tag__controls-card">
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
                {/* <EditorCardAdd text="添加商品分组" onAdd={this.addGoodTag} /> */}
              </ControlGroup>
            )}
          </div>
        )}

        <div className="upload-divider" />
      </>
    );
  }
}
