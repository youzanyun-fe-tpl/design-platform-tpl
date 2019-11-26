import React, { Component } from 'react';
import concat from 'lodash/concat';
import { chooseGoods } from 'editorSelectors';
import { ControlGroup, EditorCard, GoodsImage } from 'editor-common';
import { transferGoodsList } from './helper';
import { MAXNUM_GOODS_NUM } from './constants';

export default class GoodsSelector extends Component {
  // 添加商品
  addGoodImage = () => {
    const { globalConfig, onCustomInputChange } = this.props;
    const { goods = [] } = this.props.value;
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

  render() {
    const { value, globalConfig, showError, validation } = this.props;
    const { goods = [] } = value;

    return (
      <>
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
      </>
    );
  }
}
