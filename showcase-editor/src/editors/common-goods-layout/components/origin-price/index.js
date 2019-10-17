import React, { Component } from 'react';
import { Checkbox } from 'zent';

import { getCheckBoxValue } from '../../helper';
import { ControlGroup } from 'editor-common';
import { booleanToString, numberToBoolean } from '../../../../utils';

export default class OriginPrice extends Component {
  onBooleanToStringChange = name => e => {
    const { onChange } = this.props;
    const value = e.target.checked;

    onChange({
      [name]: booleanToString(value),
    });
  };

  render() {
    const {
      value: { price = 1, show_origin_price: originPrice = 0 },
    } = this.props;

    const showPrice = numberToBoolean(price);
    const showOriginPrice = numberToBoolean(originPrice);
    return (
      <>
        <ControlGroup label="商品价格" value={getCheckBoxValue(showPrice)}>
          <Checkbox
            checked={showPrice}
            name="price"
            onChange={this.onBooleanToStringChange('price')}
          />
        </ControlGroup>

        <ControlGroup label="商品原价" value={getCheckBoxValue(showOriginPrice)}>
          <Checkbox
            checked={showOriginPrice}
            name="show_origin_price"
            onChange={this.onBooleanToStringChange('show_origin_price')}
          />
        </ControlGroup>
      </>
    );
  }
}
