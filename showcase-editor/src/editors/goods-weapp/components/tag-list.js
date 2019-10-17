import React, { Component } from 'react';

import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';

import { Checkbox } from 'zent';
import { chooseGoodsTag } from 'editorSelectors';
import { ControlGroup, Control, EditorCard, Divider } from 'editor-common';

import TagSubEntryItem from './tag-item';

import { transferSubEntry, validSubEntry, updateSubEntry } from '../helper';
import { booleanToString, numberToBoolean } from '../../../utils';

import { TAG_LIST_TOP, TAG_LIST_LEFT, MAXNUM_TAG, DISPLAY_ALL_GOODS } from '../default-component';

export default class TagListHeader extends Component {
  addGoodTag = () => {
    let { sub_entry: subEntry, type } = this.props.value;
    const { globalConfig, onCustomInputChange } = this.props;

    chooseGoodsTag({
      config: globalConfig,
      multiple: true,
      onChoose(list) {
        const subEntryData = transferSubEntry(list, subEntry);
        forEach(subEntryData, item => {
          subEntry.push(item);
        });
        subEntry = validSubEntry(subEntry, MAXNUM_TAG, type);
        onCustomInputChange('sub_entry')(subEntry);
      },
    });
  };

  handleChange = list => {
    const { onCustomInputChange } = this.props;
    onCustomInputChange('sub_entry')(list);
  };

  handleItemChange = (subEntryItemData, index) => {
    const { value, onCustomInputChange } = this.props;
    const { sub_entry: subEntry } = value;
    const subEntryData = updateSubEntry(subEntryItemData, index, subEntry);
    onCustomInputChange('sub_entry')(subEntryData);
  };

  // 切换顶部菜单/左侧菜单
  handleTypeChange = e => {
    const { onChange, value, setMetaProperty, settings = {} } = this.props;
    const { sub_entry: subEntry } = value;

    const type = e.target.value;
    const subEntryBak = cloneDeep(subEntry);
    let params;

    if (type === 'tag_list_left') {
      // 如果是 左侧菜单，则isShowAll 设置为false，没有设置全部的选项
      subEntryBak &&
        subEntryBak.forEach(item => {
          item.isShowAll = false;
        });

      params = {
        ...TAG_LIST_LEFT,
        type,
        timestamp: +new Date(),
        sub_entry: subEntryBak,
        image_fill_style: settings.fillStyle || '1',
      };
    } else {
      subEntryBak.splice(15);
      params = {
        ...TAG_LIST_TOP,
        type,
        sub_entry: subEntryBak,
        image_fill_style: settings.fillStyle || '1',
      };
    }
    onChange(params, true);
    setMetaProperty();
  };

  onBooleanToStringChange = name => e => {
    const { onChange } = this.props;
    const value = e.target.checked;

    onChange({
      [name]: booleanToString(value),
    });
  };

  render() {
    const { value, globalConfig, onInputChange, showError, validation } = this.props;
    const {
      sub_entry: subEntry,
      nav_style: navStyle = '0',
      type,
      sticky,
      show_all_goods_tag: allGoodsTag,
    } = value;

    const showAllGoodsTag = numberToBoolean(allGoodsTag);
    const isTopTagList = type === 'tag_list_top';

    // 初始化 如果一开始goods_number是0，那么就是选择了全部商品
    subEntry &&
      subEntry.forEach(item => {
        if (item.goods_number === DISPLAY_ALL_GOODS && isTopTagList) {
          item.isShowAll = true;
        } else {
          item.isShowAll = false;
        }
      });

    return (
      <>
        <ControlGroup
          label="添加商品分组"
          helpDesc={`最多添加${MAXNUM_TAG}个商品分组`}
          labelColored
          style={{ marginTop: '20px' }}
        />
        <ControlGroup block bgColored>
          <EditorCard
            list={subEntry}
            canDrag
            canDelete
            canAdd={isTopTagList ? subEntry.length < MAXNUM_TAG : true}
            addText="添加商品分组"
            onChange={this.handleChange}
            onAdd={this.addGoodTag}
          >
            {subEntry.map((item, index) => (
              <TagSubEntryItem
                globalConfig={globalConfig}
                isTopTagList={isTopTagList}
                key={index}
                index={index}
                data={item}
                onChange={this.handleItemChange}
                showError={showError || this.getMetaProperty('sub_entry_item', 'touched')}
                error={
                  isArray(validation.sub_entry_item) ? validation.sub_entry_item[index] : undefined
                }
              />
            ))}
          </EditorCard>
        </ControlGroup>

        <div className="upload-divider" />

        <Control
          label="展示模板"
          valueMap={{
            tag_list_top: '顶部菜单',
            tag_list_left: '左侧菜单',
          }}
          name="type"
          options={[
            { value: 'tag_list_top', icon: 'menu-top' },
            { value: 'tag_list_left', icon: 'menu-left' },
          ]}
          value={type}
          onChange={this.handleTypeChange}
        />

        {isTopTagList && (
          <>
            <ControlGroup label="全部分组" value={showAllGoodsTag ? '展示' : '不展示'}>
              <Checkbox
                checked={showAllGoodsTag}
                name="show_all_goods_tag"
                onChange={this.onBooleanToStringChange('show_all_goods_tag')}
              />
            </ControlGroup>
            <Control
              label="菜单样式"
              valueMap={{
                0: '样式1',
                1: '样式2',
                2: '样式3',
              }}
              options={[
                { value: '0', icon: 'tabs-1' },
                { value: '1', icon: 'tabs-2' },
                { value: '2', icon: 'tabs-3' },
              ]}
              name="nav_style"
              value={navStyle}
              onChange={onInputChange}
            />
            <Control
              label="菜单位置"
              name="sticky"
              valueMap={{
                0: '正常模式',
                1: '顶部固定',
              }}
              options={[{ value: '0', icon: 'menu-normal' }, { value: '1', icon: 'menu-fixed' }]}
              value={sticky}
              onChange={onInputChange}
            />
            <Divider />
          </>
        )}
      </>
    );
  }
}
