## CouponSelector 商品选择器

### 代码演示

```js
export default class CouponEditor extends DesignEditor {
  render() {
    const { value, showError, validation } = this.props;

    return (
      <div>
        <CouponSelector
          value={value}
          showError={showError}
          validation={validation}
          onCustomInputChange={this.onCustomInputChange}
        />
      </div>
    );
  }
}
```

### API

| 参数        | 说明                    | 类型     | 默认值           | 是否必填 |
| ----------- | -----------------------| -------- | ---------------- | -------- |
| value      | 扩展类名                 | string   |              | 是       |
| showError | 是否显示错误提示            | number   |              | 是       |
| validation  | 具体的错误提示            | object  |              | 是       |
| onCustomInputChange | 自定义输入方法    | function |              | 是       |

### 说明

在调用优惠券选择器的时候，上述的props都可以默认传入，按照demo例子的调用方式即可

### 备注

在调用优惠券选择器的时候，获取的数据都是存在`coupon`字段里的，这是固定写死的，不需要开发者额外去定义。
