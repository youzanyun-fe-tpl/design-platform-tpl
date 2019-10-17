import React from 'react';
import { Input } from 'zent';
import { DesignEditor } from '../../common/editor-base';
import { ComponentTitle, ControlGroup, ColorPicker } from 'editor-common';
import { PLACEHOLDER, DEFAULT_BG_COLOR, DEFAULT_COLOR } from './constants';

const prefix = 'decorate-notice-editor';
export default class ThirdNoticeEditor extends DesignEditor {
  render() {
    const { value, showError, validation } = this.props;

    return (
      <div className={prefix}>
        <ComponentTitle name="公告" withMargin />
        <ControlGroup
          label="公告"
          labelColored
          required
          block
          showError={showError}
          error={validation.content}
        >
          <Input
            name="goods"
            placeholder={PLACEHOLDER}
            value={value.content}
            onChange={this.onInputChange}
            onBlur={this.onInputBlur}
          />
        </ControlGroup>
        <ControlGroup label="背景颜色">
          <ColorPicker
            defaultColor={DEFAULT_BG_COLOR}
            color={value.bg_color}
            onChange={this.onCustomInputChange('bg_color')}
          />
        </ControlGroup>
        <ControlGroup label="文字颜色">
          <ColorPicker
            defaultColor={DEFAULT_COLOR}
            color={value.color}
            onChange={this.onCustomInputChange('color')}
          />
        </ControlGroup>
      </div>
    );
  }

  // 组件信息
  static info = {
    type: 'extension-notice',
    name: '三方公告组件',
    description: '公告',
    icon: 'https://img.yzcdn.cn/public_files/2019/02/12/c52262f634e5fbba92f69abb8d7134ee.png',
    maxNum: 20,
    usedNum: 0,
    status: '',
    extensionImage:
      'https://img.yzcdn.cn/public_files/2019/08/27/b73cb3ec7dec0b327b411975e8ca0029.png',
  };

  static getInitialValue() {
    return {
      type: 'extension-notice',
      goods: '',
      bg_color: DEFAULT_BG_COLOR,
      color: DEFAULT_COLOR,
    };
  }

  static validate(value) {
    return new Promise(resolve => {
      const errors = {};
      const { content } = value;
      if (!content || !content.trim()) {
        errors.content = '请填写公告内容';
      }

      resolve(errors);
    });
  }
}
