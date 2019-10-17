const BASE = {
  // 显示比例
  display_scale: '0',

  // 列表样式（0: 大图, 1: 小图, 2: 一大两小, 3: 详细列表)
  size: '0',

  // (0: 卡片1, 1: 瀑布流, 2: 极简样式, 3: 促销样式, 5: 卡片2)
  size_type: '0',

  // 显示购买按钮（0: 不显示, 1: 显示）
  buy_btn: '1',

  // 购买按钮样式
  buy_btn_type: '1',

  // 一行三个以及横向滚动：是否显示购买按钮。
  // 这两种情况下 buy_btn 是不生效的。
  // 默认不显示
  buy_btn_express: '0',

  // 购买按钮自定义文案
  button_text: '',

  // 显示商品名（0: 不显示, 1: 显示）
  title: '1',

  // 显示商品描述
  show_sub_title: '1',

  // 显示价格（0: 不显示, 1: 显示）
  price: '1',

  // 是否显示角标 (0: 不显示, 1: 显示)
  show_corner_mark: '0',

  // 角标样式（0: 新品, 1: 热卖, 2: NEW, 3: HOT, 4: 自定义）
  corner_mark_type: '0',

  // 自定义角标图片
  corner_mark_image: '',

  // 编辑时的默认占位图片，一般通过各个微页面模版指定
  default_image_url: '',

  // 图片填充方式
  image_fill_style: '1',

  // 页面边距
  page_margin: 15,

  // 商品间距
  goods_margin: 10,

  // 商品倒角 (1: 直角, 2: 圆角)
  border_radius_type: '1',

  // 文本对齐方式（left: 左对齐, center: 居中）
  text_align_type: 'left',

  // 文本样式 (1: 常规体, 2: 加粗体)
  text_style_type: '1',
};

/**
 * 商品默认数据
 * */
export const GOODS = {
  ...BASE,
  // 商品
  goods: [],

  // 是否展示原价(0 不展示, 1 展示)
  show_origin_price: 0,
  // 商品分组
  goods_list: {},

  // 商品来源类型选择(0: 商品来源，1：商品分组来源)
  goods_from: '0',

  // 商品来源是商品分组 显示个数
  goods_number_v2: '6',

  // 组件类型
  type: 'extension-goods-weapp',
};

export const TAG_LIST_TOP = {
  ...BASE,

  // 商品分组
  sub_entry: [],

  // 菜单样式
  nav_style: '0',

  // 菜单顶部自动固定
  sticky: '0',

  //
  show_all_goods_tag: '0',
  // 组件类型
  type: 'extension-goods-weapp',
};

export const TAG_LIST_LEFT = {
  ...BASE,
  // 图片比例
  display_scale: '1',
  // 商品分组
  sub_entry: [],

  // 详细列表
  size: '3',

  // 左侧分组定制
  size_type: '8',

  // 左侧分组定制
  page_margin: 15,

  // 左侧风组定制
  goods_margin: 20,

  // 组件类型
  type: 'extension-goods-weapp',
};

// 商品分组添加个数限制
export const MAXNUM = 50;

// 商品分组添加个数限制
export const MAXNUM_TAG = 15;

// 商品显示个数限制
export const MAXNUM_GOODS_NUM = 100;

// 商品显示全部
export const DISPLAY_ALL_GOODS = 0;
