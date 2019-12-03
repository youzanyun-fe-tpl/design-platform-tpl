# 组件开发

## 目录结构

```
├── dist                  构建结果
├── src                   源码目录
│   └── Xxx               自定义组件
│       └── App.vue       自定义组件指定入口文件
├── webpack               webpack打包配置
└── package.json
```

## 命令
`npm install` 安装项目依赖

本地开发
`npm run dev` 

开发打包
`npm run build` 

## 如何开发自定义组件

- 通过开发者工具创建组件
- 在 `src` 目录下可以开发自定义组件，组件入口文件名必须为`App.vue`，使用 `export default` 直接导出对象，且包含直接用字符串声明值的 name，如：

```html
<script>
export default {
  name: 'demo'
};
</script>
```
