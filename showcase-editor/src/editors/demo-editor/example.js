import React from 'react';
import { Button, Slider, Input, Radio, Switch, Checkbox } from 'zent';

import {
  ComponentTitle,
  RadioButton,
  ControlGroup,
  Tabs,
  Divider,
  EditorCard,
  GoodsImage,
  LinkTag,
  ImageEditor,
  SubEntryItem,
} from 'editor-common';

const newLinkMenuItems = [
  'FeatureAndCategory',
  'GoodsAndTag',
  'Coupon',
  'SecKill',
  'Apps',
  'Survey',
  'History',
  'HomePage',
  'UserCenter',
  'OfflineList',
  'OfflinePage',
  'Cart',
  'AllGoods',
  'Chat',
  'PointsStore',
  'PaidColumn',
  'PaidContent',
  'PaidLive',
  'MyPaidContent',
  'Link',
  'CalendarCheckIn',
];

// import './style.scss';

const DEFAULT_IMAGE_1 =
  'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png!small.webp';
const DEFAULT_IMAGE_2 =
  'https://img.yzcdn.cn/upload_files/2019/01/15/FvtY95Qd65ll8ex6BLDY3-_8pkSd.jpg?imageView2/2/w/100/h/100/q/75/format/webp';

const uploadConfig = {
  fetchUrl: `//materials.youzan.com/shop/fetchPubImg.json`,
  tokenUrl: `//materials.youzan.com/shop/pubImgUploadToken.json`,
};

export default class Example extends React.Component {
  state = {
    activeId: '0',
    pageMargin: 15,
    style: '0',
    styleLabel: '无边白底',
    ratio: '1',
    ratioLabel: '1:1',
    radius: '0',
    radiusLabel: '直角',
    showTitle: false,
    goods: [
      {
        id: '21323',
        url: 'https://www.youzan.com',
        image_url: DEFAULT_IMAGE_1,
        price: '99.00',
        title: `这里显示商品名称，最多显示2行`,
        sub_title: '这里显示商品描述，最多显示1行',
      },
      {
        id: '84823',
        url: 'https://www.youzan.com',
        image_url: DEFAULT_IMAGE_2,
        price: '99.00',
        title: `这里显示商品名称，最多显示2行`,
        sub_title: '这里显示商品描述，最多显示1行',
      },
    ],
    goodsList: { title: '哪天测试商品', url: 'https://www.youzan.com' },
    goodsNumber: '10',
    tagList: [
      {
        id: '21323',
        url: 'https://www.youzan.com',
        image_url: DEFAULT_IMAGE_1,
        price: '99.00',
        title: 'tag1',
        sub_title: '这里显示商品描述，最多显示1行',
        tagName: '11111',
      },
      {
        id: '84823',
        url: 'https://www.youzan.com',
        image_url: DEFAULT_IMAGE_2,
        price: '99.00',
        title: 'tag2',
        sub_title: '这里显示商品描述，最多显示1行',
        tagName: '22222',
      },
      {
        id: '844223',
        url: 'https://www.youzan.com',
        image_url: DEFAULT_IMAGE_2,
        price: '99.00',
        title: 'tag3',
        sub_title: '这里显示商品描述，最多显示1行',
        tagName: '23333',
      },
    ],
    goodsNumberRadioValue: '0',
    goodsNumberInputValue: '6',
    imageUrl: DEFAULT_IMAGE_1,
    subEntry: [
      {
        alias: 'Bm3jKcFYyd',
        image_height: 500,
        image_id: '1286573785',
        image_thumb_url: 'upload_files/2019/01/15/FiZNujZ2janLtykWkR6DU6oLE7Ex.jpg!100x100.jpg',
        image_url: 'http://img.yzcdn.cn/upload_files/2019/01/15/FiZNujZ2janLtykWkR6DU6oLE7Ex.jpg',
        image_width: 500,
        images: [
          {
            image_url:
              'http://img.yzcdn.cn/upload_files/2019/01/15/FiZNujZ2janLtykWkR6DU6oLE7Ex.jpg',
          },
          {
            image_url:
              'http://img.yzcdn.cn/upload_files/2019/01/19/c20bad8beb5d2e626348312d6887092b.jpg',
          },
        ],
        link_id: 77973177,
        link_title: '小浣熊-商品角标-微页面标题',
        link_type: 'feature',
        link_url: 'https://h5.youzan.com/wscshop/showcase/feature?alias=Bm3jKcFYyd',
        template_id: 1,
        title: '111',
        type: 'image_ad_selection',
      },
      {
        alias: '2op27vjtuph8i',
        goods_type: '0',
        image_height: 500,
        image_id: '1289370943',
        image_thumb_url: 'upload_files/2019/01/19/c20bad8beb5d2e626348312d6887092b.jpg!100x100.jpg',
        image_url:
          'http://img.yzcdn.cn/upload_files/2019/01/19/c20bad8beb5d2e626348312d6887092b.jpg',
        image_width: 500,
        link_id: '451296900',
        link_title: '普通商品',
        link_type: 'goods',
        link_url: 'https://h5.youzan.com/v2/showcase/goods?alias=2op27vjtuph8i',
        title: '2222',
        type: 'image_ad_selection',
      },
    ],
    subEntry2: [
      {
        alias: 'Bm3jKcFYyd',
        image_height: 500,
        image_id: '1286573785',
        image_thumb_url: 'upload_files/2019/01/15/FiZNujZ2janLtykWkR6DU6oLE7Ex.jpg!100x100.jpg',
        image_url: 'http://img.yzcdn.cn/upload_files/2019/01/15/FiZNujZ2janLtykWkR6DU6oLE7Ex.jpg',
        image_width: 500,
        link_id: 77973177,
        link_title: '小浣熊-商品角标-微页面标题',
        link_type: 'feature',
        link_url: 'https://h5.youzan.com/wscshop/showcase/feature?alias=Bm3jKcFYyd',
        template_id: 1,
        title: '111',
        type: 'image_ad_selection',
      },
      {
        alias: '2op27vjtuph8i',
        goods_type: '0',
        image_height: 500,
        image_id: '1289370943',
        image_thumb_url: 'upload_files/2019/01/19/c20bad8beb5d2e626348312d6887092b.jpg!100x100.jpg',
        image_url:
          'http://img.yzcdn.cn/upload_files/2019/01/19/c20bad8beb5d2e626348312d6887092b.jpg',
        image_width: 500,
        link_id: '451296900',
        link_title: '普通商品',
        link_type: 'goods',
        link_url: 'https://h5.youzan.com/v2/showcase/goods?alias=2op27vjtuph8i',
        title: '2222',
        type: 'image_ad_selection',
      },
    ],
  };

  handleActiveIdChange = id => {
    this.setState({
      activeId: id,
    });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      [`${target.name}Label`]: target.children,
    });
  };

  handleCheckboxChange = ({ target }) => {
    this.setState({
      [target.name]: target.checked,
    });
  };

  handleCustomChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  // 添加商品
  addGoodImage = () => {
    const { goods } = this.state;

    this.setState({
      goods: [
        ...goods,
        {
          id: Math.random() * 100000,
          url: 'https://www.youzan.com',
          image_url: DEFAULT_IMAGE_1,
          price: '99.00',
          title: Math.random() * 100000,
          sub_title: '这里显示商品描述，最多显示1行',
        },
      ],
    });
  };

  handleGoodsChange = goods => {
    this.setState({ goods });
  };

  handleGoodsListClose = () => {
    this.setState({ goodsList: {} });
  };

  handleGoodsListEdit = () => {
    this.setState({
      goodsList: { ...this.state.goodsList, title: '测试测试啊' },
    });
  };

  addTag = () => {
    const { tagList } = this.state;

    this.setState({
      tagList: [
        ...tagList,
        {
          id: Math.random() * 100000,
          url: 'https://www.youzan.com',
          image_url: DEFAULT_IMAGE_2,
          price: '99.00',
          title: Math.random() * 100000 - 50000,
          sub_title: '这里显示商品描述，最多显示1行',
          tagName: '22222',
        },
      ],
    });
  };

  handleTagChange = tagList => {
    this.setState({ tagList });
  };

  handleImageChange = image => {
    this.setState({
      imageUrl: image.attachment_url,
    });
  };

  handleEntryListChange = entryList => {
    this.setState({
      subEntry: entryList,
    });
  };

  handleEntryChange = (entry, index) => {
    const newSubEntry = [...this.state.subEntry];
    newSubEntry.splice(index, 1, entry);
    this.setState({
      subEntry: newSubEntry,
    });
  };

  render() {
    const {
      pageMargin,
      style,
      styleLabel,
      ratio,
      ratioLabel,
      radius,
      radiusLabel,
      showTitle,
      activeId,
      goods,
      goodsList,
      goodsNumber,
      tagList,
      goodsNumberRadioValue,
      goodsNumberInputValue,
      imageUrl,
      subEntry,
      subEntry2,
    } = this.state;

    return (
      <div className="deco-example">
        <ComponentTitle
          name="例子"
          urls={[
            { name: '视频教程', href: 'https://www.youzan.com' },
            { name: '文字教程', href: 'https://www.youzan.com' },
          ]}
          noticeMsg="这是例子组件，什么乱七八糟的东西都有"
          footer={
            <ControlGroup label="是否启用底部导航">
              <Switch checked size="small" />
            </ControlGroup>
          }
        />

        <Tabs activeId={activeId} onChange={this.handleActiveIdChange}>
          <Tabs.TabPanel tab="商品" id="0" />
          <Tabs.TabPanel tab="商品分组" id="1" />
        </Tabs>

        <ControlGroup label="添加商品" required style={{ padding: '30px 16px 10px' }}>
          <Button type="primary" outline>
            添加商品
          </Button>
          <Button type="primary" outline>
            选择分组
          </Button>
        </ControlGroup>

        <ControlGroup showLabel={false} showError={true} error={''} block bgColored>
          <EditorCard
            list={goods}
            canDelete
            canAdd={goods.length < 30}
            isInline
            onChange={this.handleGoodsChange}
            onAdd={this.addGoodImage}
          >
            {goods.map(item => (
              <GoodsImage globalConfig={window._global} key={item.id} data={item} />
            ))}
          </EditorCard>
        </ControlGroup>

        <ControlGroup className="deco-example__tag-list" block>
          <EditorCard
            list={tagList}
            canDelete
            canAdd={tagList.length < 30}
            addText="添加背景图"
            onChange={this.handleTagChange}
            onAdd={this.addTag}
            onFilter={i => i > 1}
          >
            {tagList.map(item => (
              <React.Fragment key={item.id}>
                <ControlGroup label="商品来源:" normalAlign>
                  <LinkTag url={item.url} onEdit={() => {}}>
                    {item.title}
                  </LinkTag>
                </ControlGroup>
                <ControlGroup label="菜单名称:" normalAlign>
                  <Input placeholder="最多10个字" maxLength={10} />
                </ControlGroup>
                <ControlGroup label="显示个数:" error={''} normalAlign>
                  <Radio.Group value={goodsNumberRadioValue} onChange={this.handleChange}>
                    <Radio name="goodsNumberRadioValue" value="0">
                      <Input
                        name="goodsNumberInputValue"
                        value={goodsNumberInputValue}
                        onChange={this.handleChange}
                        placeholder="自定义"
                        style={{ width: '85px' }}
                      />
                    </Radio>
                    <Radio name="goodsNumberRadioValue" value="1">
                      全部
                    </Radio>
                  </Radio.Group>
                </ControlGroup>
              </React.Fragment>
            ))}
          </EditorCard>
        </ControlGroup>

        {goodsList.title && (
          <ControlGroup block>
            <LinkTag
              colored
              url={goodsList.url}
              type="商品标签"
              onEdit={this.handleGoodsListEdit}
              onClose={this.handleGoodsListClose}
            >
              {goodsList.title}
            </LinkTag>
          </ControlGroup>
        )}

        <ControlGroup block>
          <LinkTag colored type="商品标签" icon="1-1" actions={['装修', '更换']}>
            测试测试啊
          </LinkTag>
        </ControlGroup>

        <ControlGroup label="显示个数" showError error="这是错误信息" helpDesc="最多显示 50 个">
          <Input value={goodsNumber} name="goods_number" onChange={this.handleChange} />
        </ControlGroup>

        <Divider />

        <ControlGroup label="页面边距" normalAlign>
          <Slider
            min={0}
            max={30}
            value={Number(pageMargin)}
            onChange={this.handleCustomChange('pageMargin')}
          />
        </ControlGroup>

        <ControlGroup label="商品样式" block value={styleLabel}>
          <RadioButton.Group block perLine={3} value={style} onChange={this.handleChange}>
            <RadioButton name="style" value="0">
              无边白底
            </RadioButton>
            <RadioButton name="style" value="1">
              卡片投影
            </RadioButton>
            <RadioButton name="style" value="2">
              描边白底
            </RadioButton>
            <RadioButton name="style" value="3">
              无边透明
            </RadioButton>
          </RadioButton.Group>
        </ControlGroup>

        <ControlGroup label="图片比例" value={ratioLabel}>
          <RadioButton.Group value={ratio} onChange={this.handleChange}>
            <RadioButton name="ratio" value="0">
              3:2
            </RadioButton>
            <RadioButton name="ratio" value="1">
              1:1
            </RadioButton>
            <RadioButton name="ratio" value="2">
              3:4
            </RadioButton>
            <RadioButton name="ratio" value="3">
              16:9
            </RadioButton>
          </RadioButton.Group>
        </ControlGroup>

        <ControlGroup label="图片比例" value={ratioLabel}>
          <RadioButton.Group value={ratio} round onChange={this.handleChange}>
            <RadioButton name="ratio" value="0">
              <div style={{ backgroundColor: '#E84C2C' }} />
            </RadioButton>
            <RadioButton name="ratio" value="1">
              <div style={{ backgroundColor: '#FFE9B7' }} />
            </RadioButton>
            <RadioButton name="ratio" value="2">
              <div style={{ backgroundColor: '#fff' }} />
            </RadioButton>
            <RadioButton name="ratio" value="3">
              <div style={{ backgroundColor: '#373B3E' }} />
            </RadioButton>
            <RadioButton name="ratio" value="3">
              <div style={{ backgroundColor: '#E0F4E4' }} />
            </RadioButton>
          </RadioButton.Group>
        </ControlGroup>

        <ControlGroup label="商品倒角" value={radiusLabel}>
          <RadioButton.Group value={radius} onChange={this.handleChange}>
            <RadioButton name="radius" value="0">
              直角
            </RadioButton>
            <RadioButton name="radius" value="1">
              圆角
            </RadioButton>
          </RadioButton.Group>
        </ControlGroup>

        <Divider />

        <ControlGroup label="商品名称" value={showTitle ? '显示' : '不显示'}>
          <Checkbox name="showTitle" checked={showTitle} onChange={this.handleCheckboxChange} />
        </ControlGroup>

        <ControlGroup label="图片编辑">
          <ImageEditor
            globalConfig={window._global}
            uploadConfig={uploadConfig}
            className="image-editor"
            imageUrl={imageUrl}
            onChange={this.handleImageChange}
          />
        </ControlGroup>

        <ControlGroup label="二级导航" labelColored block>
          <EditorCard list={subEntry} onChange={this.handleEntryListChange} canDelete>
            {subEntry.map((item, index) => (
              <SubEntryItem
                key={item.alias}
                linkMenuItems={newLinkMenuItems}
                globalConfig={window._global}
                uploadConfig={uploadConfig}
                settings={{}}
                index={index}
                showHeader
                showHandler
                block
                imageLabel="图标"
                imageDesc={['展开前', '展开后']}
                imageHelpText="建议使用50x50像素的圆形png图片"
                data={item}
                onChange={this.handleEntryChange}
                titlePlaceholder="最多6个字"
                titleMaxLength={6}
                helpText="这是 helpText 哇"
                extra={
                  <ControlGroup label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" normalAlign>
                    <Checkbox checked={true}>独立入口展示</Checkbox>
                  </ControlGroup>
                }
              />
            ))}
          </EditorCard>
        </ControlGroup>

        <ControlGroup label="三级导航" labelColored block>
          <EditorCard list={subEntry2} onChange={this.handleEntryListChange} canDelete>
            {subEntry2.map((item, index) => (
              <SubEntryItem
                key={item.alias}
                linkMenuItems={newLinkMenuItems}
                globalConfig={window._global}
                uploadConfig={uploadConfig}
                settings={{}}
                index={index}
                imageLabel="图标"
                imageHelpText="建议使用50x50像素的圆形png图片"
                data={item}
                onChange={this.handleEntryChange}
                titlePlaceholder="最多6个字"
                titleMaxLength={6}
                helpText="这是 helpText 哇"
              />
            ))}
          </EditorCard>
        </ControlGroup>
      </div>
    );
  }
}
