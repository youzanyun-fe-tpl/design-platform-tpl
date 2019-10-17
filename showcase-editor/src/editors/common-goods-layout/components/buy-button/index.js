import React, { Component } from 'react';

import { Radio, Checkbox, Input } from 'zent';
import { ControlGroup } from 'editor-common';

import { isShowBuyButton, getCheckBoxValue } from '../../helper';
import { booleanToString, numberToBoolean } from '../../../../utils';

import './index.scss';

export default class BuyButton extends Component {
  onBuyButtonChange = e => {
    const { onChange } = this.props;
    const value = e.target.checked;
    const params = {
      buy_btn_express: booleanToString(value),
      buy_btn: booleanToString(value),
    };

    onChange(params);
  };

  handleChangeBuyBtnType = e => {
    const { onChange } = this.props;
    const buyBtnType = e.target.value;
    let btnText;
    if (+buyBtnType === 4 || +buyBtnType === 8) {
      btnText = '购买';
    } else if (+buyBtnType === 3 || +buyBtnType === 7) {
      btnText = '马上抢';
    }

    onChange({
      buy_btn_type: buyBtnType,
      button_text: btnText,
    });
  };

  handleChangeBtnText = e => {
    const { onChange } = this.props;
    const btnText = e.target.value || '';
    onChange({
      button_text: btnText,
    });
  };

  render() {
    const { value } = this.props;

    const {
      size,
      buy_btn: buyBtn,
      buy_btn_type: buyBtnType,
      button_text: btnText,
      size_type: sizeType,
      text_align_type: textAlignType,
    } = value;

    const isThreeOrSwipe = size === '5' || size === '6';
    const isTextAlignCenter = textAlignType === 'center';
    const showBuyBtn = numberToBoolean(buyBtn);

    return (
      <div>
        {isShowBuyButton(sizeType) && (
          <ControlGroup label="购买按钮" value={getCheckBoxValue(showBuyBtn)}>
            <Checkbox
              checked={showBuyBtn}
              disabled={isThreeOrSwipe && isTextAlignCenter}
              name="buy_btn"
              onChange={this.onBuyButtonChange}
            />
          </ControlGroup>
        )}

        {showBuyBtn && isShowBuyButton(sizeType) && (
          <div className="common-goods-layout__buy-button">
            <ControlGroup bgColored>
              <Radio.Group value={buyBtnType} onChange={this.handleChangeBuyBtnType}>
                <Radio name="buy_btn_type" value="1" disabled={isTextAlignCenter}>
                  样式1
                </Radio>
                <Radio name="buy_btn_type" value="2" disabled={isTextAlignCenter}>
                  样式2
                </Radio>
                <Radio name="buy_btn_type" value="3" disabled={isThreeOrSwipe}>
                  样式3
                </Radio>
                <Radio name="buy_btn_type" value="4" disabled={isThreeOrSwipe}>
                  样式4
                </Radio>
                <Radio name="buy_btn_type" value="5" disabled={isTextAlignCenter}>
                  样式5
                </Radio>
                <Radio name="buy_btn_type" value="6" disabled={isTextAlignCenter}>
                  样式6
                </Radio>
                <Radio name="buy_btn_type" value="7" disabled={isThreeOrSwipe}>
                  样式7
                </Radio>
                <Radio name="buy_btn_type" value="8" disabled={isThreeOrSwipe}>
                  样式8
                </Radio>
              </Radio.Group>
            </ControlGroup>
            {(buyBtnType === '3' ||
              buyBtnType === '4' ||
              buyBtnType === '7' ||
              buyBtnType === '8') && (
              <ControlGroup block bgColored>
                <Input
                  value={btnText}
                  name="buy-btn-text"
                  className="buy-btn-text"
                  maxLength={4}
                  onChange={this.handleChangeBtnText}
                />
              </ControlGroup>
            )}
          </div>
        )}
      </div>
    );
  }
}
