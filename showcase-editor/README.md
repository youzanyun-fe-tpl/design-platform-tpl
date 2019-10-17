## 基本介绍

开发店铺装修第三方组件编辑器

## 文件目录

```bash
├──src                      src目录
  ├── common                公共组件
  ├── editors               开发者开发的组件编辑器代码，**开发者在这里开发**
  ├── utils                 相关的工具方法
├── build                   webpack打包配置
├── node_modules            node_modules
└── dist                    本地打包文件
```

## 如何开发一个编辑器

编辑器主要是为店铺装修中C端（小程序组件和H5组件）提供编辑数据。

脚手架中有一些初始的编辑器示例，可以提供参考。在demo示例中，显示了所有的编辑器基础UI的使用方式，在开发编辑器的时候，需要用基础UI，保持风格的统一。

Editor 需要继承 `src/common/editor-base`，子类需要重写一些方法和属性：

- render 实例方法
- info 静态属性，这是组件的基本信息，必须要有的字段有：
  - type: 组件类型，PC端会根据这个type来渲染对应的editor
  - name: 组件名字
  - icon: 组件图标
  - maxNum: 组件可以使用的最大个数
  - extensionImage: 给预览占位的图片
- getInitialValue 静态方法，创建一个新组件实例时的默认值。【注意】必须要有type值，并且要和info属性里的type一致！
- validate 静态方法，对表单做校验，返回一个 Promise，将所有错误的一个 `map` resolve 出来，没有错我就返回一个空对象。
- 关于type的取值，可以参考示例编辑器，一般可以写`extension-xxx`, xxx代表具体编辑器的名字。用`extension`来表示三方组件。

`src/common/editor-base`基类提供了一些基本方法：
- `onInputChange` 封装了处理标准 Input 组件 onChange 事件的回调，使用时需要确保 onChange 抛出来的 `Event` 对象上有 `targte.name`, `target.value` 以及 `preventDefault` 和 `stopPropagation`。
- `onCustomInputChange` 提供了更加基础的 onChange 事件处理功能，适用于那些非标准 Input 组件。
- `onInputBlur` 和 `onCustomInputBlur` 提供了处理 blur 事件的功能。

Editor 有如下几个重要 props：
- value，实例当前的值
- validation，当前的错误信息，是个对象，key 对应表单里的 Input name。
- showError，是否强制显示所有错误，如果为 `true`，Editor 必须把当前所有错误显示出来。这个一般是传给editor-common里面的ControlGroup组件。具体用法可以参考demo示例
- onChange，用于回写 value，一般用不到，已经封装好了，建议使用 `onInputChange`/`onCustomInputChange`。

## 编辑选择器

除了暴露出来的`editor-common`中的基础编辑器UI，我们还暴露了三个基本的编辑选择器`editorSelectors`：

- CouponSelector
- chooseGoods
- chooseGoodsTag

具体用法可以参考`goods-weapp`里面的商品组件编辑器的用法和`coupon`中的优惠券编辑器。

## 额外的api

- zan-pc-ajax 建议ajax请求使用zan-pc-ajax库来请求，具体使用可以参考`src/editors/coupon/api.js`

## 本地开发

- npm run dev 开启本地编辑器开发
- npm run build 会打包对应的编辑器

## 原则

**开发原则和要点，开发者要特别关注！！**

* 样式支持sass，一般会写.scss
* 原则上除了lodash以外不需要在dependencies上增加额外的依赖，使用`zent`和`editor-common`和提供的选择器API就可以满足编辑器的开发工作。增加额外的依赖会使打包出来的js文件变得很大。
* 项目工程集成了eslint校验, 会在git提交的时候校验js语法规范，如果实在不需要的话，可以使用`git commit 'xxx' -n`来忽略校验报错。建议还是使用eslint校验。
* 在执行`npm run build`时，在打包编辑器代码的时候，会监测打包的代码是否用了es6的高级语法，比如`let, const`等，会有报错提示，务必重视。千万不要把含有高级预发的js文件上传上去，否则会有兼容性的问题。一般的，我们会对项目下的编辑器代码进行babel转码，因此是不会出现高级语法。出现高级预发的唯一可能是用的npm包里面有高级语法。因此还是建议不要lodash以外不需要在dependencies上增加额外的依赖。
