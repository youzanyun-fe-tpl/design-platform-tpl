import React from 'react';
import { Input, DatePicker, Checkbox } from 'zent';
import pick from 'lodash/pick';
import { DesignEditor } from '../../common/editor-base';
import {
  ComponentTitle,
  Control,
  ControlGroup,
  Tabs,
  Divider,
  ColorPicker,
  ChooseMenu,
  LinkTag,
} from 'editor-common';
import {
  ALIGN_TEXT,
  FONT_SIZE,
  FONT_WEIGHT,
  SHOW_OR_NOT,
  DEFAULT_TITLE_COLOR,
  DEFAULT_DESC_COLOR,
  DEFAULT_BG_COLOR,
} from './constants';

import './style/index.scss';

const prefix = 'decorate-third-title-text-editor';

// 对齐方式可选项
const ALIGN_OPTIONS = [
  { value: '0', icon: 'align-left' },
  { value: '1', icon: 'align-center' },
  { value: '2', icon: 'align-right' },
];

// 字体大小可选项
const FONT_SIZE_OPTIONS = [
  { value: '16', icon: 'font-x' },
  { value: '14', icon: 'font-m' },
  { value: '12', icon: 'font-s' },
];

// 字体字重可选项
const FONT_WEIGHT_OPTIONS = [
  { value: '400', icon: 'font-regular' },
  { value: '500', icon: 'font-bold' },
];

export default class TitleEditor extends DesignEditor {
  handleTemplateTypeChange = id => {
    const {
      value: { align },
      globalConfig,
      onChange,
    } = this.props;
    const needUpdate = { template_type: id };

    // 切换到传统样式，并且此时是【居右显示】，则需要改为【居左显示】。传统样式不支持【居右显示】。
    if (+id === 0 && +align === 2) {
      needUpdate.align = '0';
    }

    // 切换到微信图文样式，并且当前是小程序设置环境，则把链接类型改为【其他链接】，而不是【引导关注】
    if (+id === 1 && +globalConfig.is_weapp_setting === 1) {
      needUpdate.wx_link_type = '1';
    }

    onChange(needUpdate);
  };

  // 选择链接
  handleLinkChange = name => (value = {}) => {
    this.props.onChange({
      [name]: pick(value, [
        'alias',
        'link_type',
        'link_id',
        'link_title',
        'link_url',
        'extra_data',
      ]),
    });
    this.setMetaProperty(name, 'dirty');
  };

  // 渲染传统样式
  renderNormal = () => {
    const { value, showError, validation, globalConfig = {}, settings, linkMenuItems } = this.props;
    const {
      title = '',
      desc = '',
      align = '0',
      title_size: titleSize = '16',
      desc_size: descSize = '12',
      title_weight: titleWeight = '500',
      desc_weight: descWeight = '400',
      title_color: titleColor = '#323233',
      desc_color: descColor = '#969799',
      bg_color: bgColor = '#fff',
      show_divider: showDivider = '0',
      is_link: isLink = '0',
      link_style: linkStyle = '0',
      link_text: linkText = '查看更多',
      link = {},
    } = value;

    return (
      <>
        <ControlGroup
          label="标题内容"
          showError={showError || this.getMetaProperty('title', 'touched')}
          error={validation.title}
          block
          labelColored
        >
          <Input
            name="title"
            placeholder="请输入标题"
            value={title}
            onChange={this.onInputChange}
          />
        </ControlGroup>

        <ControlGroup
          label="描述内容"
          showError={showError || this.getMetaProperty('desc', 'touched')}
          error={validation.desc}
          block
          labelColored
        >
          <Input
            type="textarea"
            name="desc"
            placeholder="请输入要说明的文字，最多 100 字"
            maxLength={100}
            value={desc}
            onChange={this.onInputChange}
          />
        </ControlGroup>

        <Divider />

        <Control
          label="显示位置"
          valueMap={ALIGN_TEXT}
          name="align"
          options={ALIGN_OPTIONS.slice(0, 2)}
          value={align}
          onChange={this.onInputChange}
        />

        <Control
          label="标题大小"
          valueMap={FONT_SIZE}
          name="title_size"
          options={FONT_SIZE_OPTIONS}
          value={titleSize}
          onChange={this.onInputChange}
        />

        <Control
          label="描述大小"
          valueMap={FONT_SIZE}
          name="desc_size"
          options={FONT_SIZE_OPTIONS}
          value={descSize}
          onChange={this.onInputChange}
        />

        <Control
          label="标题粗细"
          valueMap={FONT_WEIGHT}
          name="title_weight"
          options={FONT_WEIGHT_OPTIONS}
          value={titleWeight}
          onChange={this.onInputChange}
        />

        <Control
          label="描述粗细"
          valueMap={FONT_WEIGHT}
          name="desc_weight"
          options={FONT_WEIGHT_OPTIONS}
          value={descWeight}
          onChange={this.onInputChange}
        />

        <ControlGroup label="标题颜色" value={titleColor}>
          <ColorPicker
            defaultColor={DEFAULT_TITLE_COLOR}
            color={titleColor}
            onChange={this.onCustomInputChange('title_color')}
          />
        </ControlGroup>

        <ControlGroup label="描述颜色" value={descColor}>
          <ColorPicker
            defaultColor={DEFAULT_DESC_COLOR}
            color={descColor}
            onChange={this.onCustomInputChange('desc_color')}
          />
        </ControlGroup>

        <ControlGroup label="背景颜色" value={bgColor}>
          <ColorPicker
            defaultColor={DEFAULT_BG_COLOR}
            color={bgColor}
            onChange={this.onCustomInputChange('bg_color')}
          />
        </ControlGroup>

        <ControlGroup label="底部分割线" value={SHOW_OR_NOT[showDivider]}>
          <Checkbox
            checked={!!+showDivider}
            onChange={this.onCustomInputChange('show_divider', ev => `${+ev.target.checked}`)}
          />
        </ControlGroup>

        <Divider />

        <ControlGroup label="查看更多" value={SHOW_OR_NOT[isLink]}>
          <Checkbox
            checked={!!+isLink}
            onChange={this.onCustomInputChange('is_link', ev => `${+ev.target.checked}`)}
          />
        </ControlGroup>

        {!!+isLink && (
          <>
            <Control
              component="Radio"
              name="link_style"
              value={linkStyle}
              block
              bgColored
              options={[
                { value: '0', children: '样式一' },
                { value: '1', children: '样式二' },
                { value: '2', children: '样式三' },
              ]}
              onChange={this.onInputChange}
            >
              {linkStyle !== '2' && (
                <Input
                  className={`${prefix}__link-text`}
                  name="link_text"
                  value={linkText}
                  maxLength={10}
                  onChange={this.onInputChange}
                />
              )}
            </Control>
            <ControlGroup
              label="跳转链接"
              bgColored
              showError={showError || this.getMetaProperty('link', 'dirty')}
              error={validation.link}
            >
              <ChooseMenu
                globalConfig={globalConfig}
                settings={settings}
                linkMenuItems={linkMenuItems}
                value={link}
                onChange={this.handleLinkChange('link')}
              />
            </ControlGroup>
          </>
        )}
      </>
    );
  };

  // 渲染微信图文样式
  renderWx = () => {
    const {
      value,
      showError,
      validation,
      globalConfig = {},
      settings = {},
      linkMenuItems,
    } = this.props;

    const {
      title = '',
      align = '0',
      wx_date: wxDate = '',
      wx_author: wxAuthor = '',
      wx_link_title: wxLinkTitle = '',
      wx_link_type: wxLinkType = '0',
      wx_link: wxLink = {},
    } = value;

    return (
      <div className={`${prefix}__wx`}>
        <ControlGroup
          label="标题内容"
          block
          labelColored
          showError={showError || this.getMetaProperty('title', 'touched')}
          error={validation.title}
        >
          <Input
            name="title"
            placeholder="请输入标题"
            value={title}
            onChange={this.onInputChange}
          />
        </ControlGroup>

        <ControlGroup label="日期" block labelColored>
          <DatePicker
            className={`${prefix}__date`}
            name="wx_date"
            value={wxDate}
            width="100%"
            onChange={this.onCustomInputChange('wx_date')}
          />
        </ControlGroup>

        <ControlGroup label="作者" block labelColored>
          <Input
            name="wx_author"
            value={wxAuthor}
            placeholder="请输入作者"
            onChange={this.onInputChange}
          />
        </ControlGroup>

        <ControlGroup
          label="链接标题"
          required
          block
          labelColored
          showError={showError || this.getMetaProperty('wxLinkTitle', 'touched')}
          error={validation.wxLinkTitle}
        >
          <Input name="wx_link_title" value={wxLinkTitle} onChange={this.onInputChange} />
        </ControlGroup>

        <Control
          label="位置选择"
          valueMap={ALIGN_TEXT}
          value={align}
          name="align"
          options={ALIGN_OPTIONS}
          onChange={this.onInputChange}
        />

        {globalConfig.is_weapp_setting !== 1 && (
          <Control
            component="Radio"
            label="链接地址"
            value={wxLinkType}
            name="wx_link_type"
            options={[{ value: '0', children: '引导关注' }, { value: '1', children: '其他链接' }]}
            onChange={this.onInputChange}
          />
        )}

        <ControlGroup label="跳转链接">
          {wxLinkType === '0' ? (
            <LinkTag url={globalConfig.url}>设置快速关注链接</LinkTag>
          ) : (
            <ChooseMenu
              globalConfig={globalConfig}
              settings={settings}
              linkMenuItems={linkMenuItems}
              value={wxLink}
              onChange={this.handleLinkChange('wx_link')}
            />
          )}
        </ControlGroup>
      </div>
    );
  };

  render() {
    const { value, globalConfig = {} } = this.props;
    const { template_type: templateType = '0' } = value;
    const noticeMsg = globalConfig.is_weapp_setting === '';

    return (
      <div className={`${prefix}`}>
        <ComponentTitle name="标题文本" noticeMsg={noticeMsg} />

        <Tabs activeId={templateType} onChange={this.handleTemplateTypeChange}>
          <Tabs.TabPanel id="0" tab="传统样式">
            {this.renderNormal()}
          </Tabs.TabPanel>
          <Tabs.TabPanel id="1" tab="微信图文样式">
            {this.renderWx()}
          </Tabs.TabPanel>
        </Tabs>
      </div>
    );
  }

  static info = {
    icon: 'https://img.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png',
    type: 'extension-title-text',
    name: '标题文本',
    description: '标题文本',
    maxNum: 20,
    usedNum: 0,
    status: '',
    extensionImage:
      'https://img.yzcdn.cn/public_files/2019/08/27/53bdb5198fe570ad12eafdf0adcc7bb3.png',
  };

  // 获取初始数据
  static getInitialValue() {
    return {
      type: 'extension-title-text',
      template_type: '0', // 样式类型。0: 传统样式，1: 微信图文样式
      title: '', // 标题
      desc: '', // 描述
      align: '0', // 显示位置。 0: 居左，1: 居中，2: 居右(微信图文样式)
      title_size: '16', // 标题大小
      desc_size: '12', // 描述大小
      title_weight: '500', // 标题字重
      desc_weight: '400', // 描述字重
      title_color: '#323233', // 标题颜色
      desc_color: '#969799', // 描述颜色
      bg_color: '#fff', // 背景颜色
      show_divider: '0', // 是否显示底部分割线
      is_link: '0', // 是否链接
      link_style: '0', // 链接样式。0: 文字，1: 文字+箭头，2: 箭头
      link_text: '查看更多', // 传统样式的链接文字
      link: {}, // 传统样式的链接对象

      /* ==== 以下是微信图文样式 ==== */
      wx_date: '', // 日期
      wx_author: '', // 作者
      wx_link_title: '', // 链接标题
      wx_link_type: '0', // 链接类型。0: 引导关注，1: 其他链接
      wx_link: {}, // 微信图文样式的链接对象
    };
  }

  // 校验
  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const {
        type,
        template_type: templateType,
        title,
        desc,
        wx_link_title: wxLinkTitle,
        is_link: isLink,
        link = {},
      } = value;

      // 如果 type 不是 title_text，则不校验了，直接返回
      if (type !== 'title_text') {
        return resolve(errors);
      }

      // 传统样式
      if (+templateType === 0) {
        // 标题和描述不能同时为空
        if ((!title || !title.trim()) && (!desc || !desc.trim())) {
          errors.title = '标题和描述不能同时为空';
        }

        // 选择了查看更多，则必须选链接
        if (+isLink === 1 && !link.link_type) {
          errors.link = '链接不能为空';
        }
      } else {
        // 微信图文样式
        if (!title) {
          errors.title = '标题不能为空';
        }

        if (!wxLinkTitle || !wxLinkTitle.trim()) {
          errors.wxLinkTitle = '链接标题不能为空';
        }
      }

      resolve(errors);
    });
  }
}
