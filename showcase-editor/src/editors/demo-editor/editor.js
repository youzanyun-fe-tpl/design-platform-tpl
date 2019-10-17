import React from 'react';
import { DesignEditor } from '../../common/editor-base';
import Example from './example';

import './style/index.scss';

const prefix = 'decorate-demo-editor';

export default class TitleEditor extends DesignEditor {
  render() {
    return (
      <div className={`${prefix}`}>
        <Example></Example>
      </div>
    );
  }
  static info = {
    icon: 'https://img.yzcdn.cn/public_files/2019/08/21/90f8ca51da162eebd9d67f361538f8c5.png',
    type: 'extension-demo-editor',
    name: 'demo示例',
    description: 'demo示例',
    maxNum: 1,
    usedNum: 0,
    status: '',
    extensionImage:
      'https://img.yzcdn.cn/public_files/2019/08/21/90f8ca51da162eebd9d67f361538f8c5.png',
  };

  static getInitialValue() {
    return {
      type: 'extension-demo-editor',
    };
  }
  static validate(value) {
    return new Promise(resolve => {});
  }
}
