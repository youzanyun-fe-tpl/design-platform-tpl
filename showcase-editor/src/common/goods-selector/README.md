## GoodsSelector 商品选择器

### 代码演示

```js
class GoodsEditor extends DesignEditor {
  render() {
    const { value, globalConfig, onChange, showError, validation } = this.props;

    return (
      <div className="decorate-third-goods-editor">
        <GoodsSelector
          onCustomInputChange={this.onCustomInputChange}
          value={value}
          globalConfig={globalConfig}
          showError={showError}
          validation={validation}
        />
      </div>
    );
  }
}
```

### API

| 参数        | 说明                    | 类型     | 默认值           | 是否必填 |
| ----------- | -----------------------| -------- | ---------------- | -------- |
| value      | 扩展类名                 | string   |              | 否       |
| globalConfig | 数据                   | array    |              | 是       |
| showError | 是否显示错误提示            | number   |              | 否       |
| validation  | 具体的错误提示            | object  |              | 否       |
| onCustomInputChange | 自定义输入方法    | function |              | 否       |

### 说明

在调用商品选择器的时候，上述的props都可以默认传入，按照demo例子的调用方式即可
