import React, { Component } from 'react';

import { Radio, Checkbox } from 'zent';
import { ControlGroup, ImageEditor } from 'editor-common';

import { getCheckBoxValue } from '../../helper';
import { booleanToString, numberToBoolean } from '../../../../utils';

import './index.scss';

const RadioGroup = Radio.Group;

export default class CornerMark extends Component {
  handleImageChange = image => {
    const { onChange } = this.props;
    onChange({
      corner_mark_image: image.attachment_url,
    });
  };

  onBooleanToStringChange = name => e => {
    const { onChange } = this.props;
    const value = e.target.checked;

    onChange({
      [name]: booleanToString(value),
    });
  };

  render() {
    const { value, globalConfig, onInputChange, uploadConfig, showError, error } = this.props;
    const {
      show_corner_mark: cornerMark,
      corner_mark_type: cornerMarkType,
      corner_mark_image: cornerMarkImage,
    } = value;

    const showCornerMark = numberToBoolean(cornerMark);

    return (
      <div>
        <ControlGroup label="商品角标" value={getCheckBoxValue(showCornerMark)}>
          <Checkbox
            checked={showCornerMark}
            name="show_corner_mark"
            onChange={this.onBooleanToStringChange('show_corner_mark')}
          />
        </ControlGroup>

        {showCornerMark && (
          <>
            <ControlGroup showLabel={false} bgColored>
              <RadioGroup value={cornerMarkType} onChange={onInputChange}>
                <Radio name="corner_mark_type" value="0">
                  新品
                </Radio>
                <Radio name="corner_mark_type" value="1">
                  热卖
                </Radio>
                <Radio name="corner_mark_type" value="2">
                  NEW
                </Radio>
                <Radio name="corner_mark_type" value="3">
                  HOT
                </Radio>
                <Radio name="corner_mark_type" value="4">
                  自定义
                </Radio>
              </RadioGroup>
            </ControlGroup>
            {cornerMarkType === '4' && (
              <div className="common-goods-layout__corner-mark">
                <ControlGroup block bgColored>
                  <ImageEditor
                    globalConfig={globalConfig}
                    uploadConfig={uploadConfig}
                    className="corner-mark-image"
                    imageUrl={cornerMarkImage}
                    onChange={this.handleImageChange}
                    showError={showError}
                    error={(error && error.corner_mark_image) || ''}
                  />
                  <p className="corner-mark-image-tips">推荐使用 100x100 像素的 .png 图片</p>
                </ControlGroup>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
