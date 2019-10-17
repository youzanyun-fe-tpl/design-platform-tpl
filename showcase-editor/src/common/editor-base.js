import { Component } from 'react';
import PropTypes from 'prop-types';
import assign from 'lodash/assign';
import reorder from '../utils/reorder';
import shallowEqual from '../utils/shallow-equal';

const NOT_EVENT_MSG =
  'onInputChange expects an `Event` with { target: { name, value } } as argument';

export class DesignEditor extends Component {
  static propTypes = {
    value: PropTypes.object,

    onChange: PropTypes.func.isRequired,

    // 验证状态
    validation: PropTypes.object.isRequired,

    // 是否强制显示所有错误
    showError: PropTypes.bool.isRequired,

    // 用来和 Design 交互
    design: PropTypes.object.isRequired,

    // 自定义全局配置，Design 不会改变这个对象的值
    globalConfig: PropTypes.object,

    // Design 全剧配置，和 globalConfig 的区别是 Design 组件可以 修改 settings 的值
    settings: PropTypes.object,

    // 修改 settings 的回调函数
    onSettingsChange: PropTypes.func,
  };

  // 以下属性需要子类重写

  // 组件的类型
  static designType = 'unknown';

  // 组件的描述
  static designDescription = '未知组件';

  // value 的验证函数
  // eslint-disable-next-line
  static validate(value, prevValue, changedProps) {
    return new Promise(resolve => resolve({}));
  }

  // 添加组件实例时的初始值
  static getInitialValue = () => {};

  constructor(props) {
    super(props);

    this.state = assign({}, this.state, {
      meta: {},
    });
  }

  /**
   * 通用的 Input 元素 onChange 回调函数
   *
   * 适用于 Input, Checkbox, Select, Radio
   */
  onInputChange = evt => {
    // 如果抛出来的不是 Event 对象，直接丢给 onChange
    if (!isEventLikeObject(evt)) {
      throw new Error(NOT_EVENT_MSG);
    }

    const { onChange } = this.props;
    const { target } = evt;
    const { name, type } = target;
    let { value } = target;

    if (type === 'checkbox') {
      value = target.checked;
    }

    onChange({
      [name]: value,
    });

    this.setMetaProperty(name, 'dirty');
  };

  /**
   * 有些组件的 onChange 事件抛出来的不是 Event 对象
   *
   * 适用于 Slider, Switch, DatePicker 以及其它自定义组件
   * @param {String} name
   * @param {Function} valueFn 转换 value 的函数
   */
  onCustomInputChange = (name, valueFn) => value => {
    const { onChange } = this.props;

    if (typeof valueFn === 'function') {
      value = valueFn(value);
    }

    onChange({ [name]: value });
    this.setMetaProperty(name, 'dirty');
  };

  /**
   * 处理 Input 元素的 blur 事件。
   */
  onInputBlur = evt => {
    // 如果抛出来的不是 Event 对象，直接丢给 onChange
    if (!isEventLikeObject(evt)) {
      throw new Error(NOT_EVENT_MSG);
    }

    const {
      target: { name },
    } = evt;
    this.onCustomInputBlur(name);
  };

  /**
   * 有些组件没有 onBlur 事件，用这个函数处理
   */
  onCustomInputBlur = name => {
    this.setMetaProperty(name, 'touched');

    this.validateValue();
  };

  /**
   * 获取 Field 的 meta 属性，包括 dirty, touched 等
   * @param {string} name Field 名字
   * @param {string} property meta 属性名字
   */
  getMetaProperty(name, property) {
    const { meta } = this.state;
    return !!(meta && meta[name] && meta[name][property]);
  }

  /**
   * 设置 Field 的 meta 属性
   * @param {string} name Field 名字
   * @param {string} property meta 属性名字
   * @param {any} state 属性的值
   */
  setMetaProperty(name, property, state = true) {
    const { meta } = this.state;
    const states = meta[name];
    if (!states || states[property] !== state) {
      this.setState({
        meta: assign({}, meta, {
          [name]: assign({}, states, { [property]: state }),
        }),
      });
    }
  }

  /**
   * 触发一次表单校验
   */
  validateValue() {
    const { value, design } = this.props;
    design.validateComponentValue(value, value, []).then(errors => {
      const id = design.getUUID(value);
      design.setValidation({ [id]: errors });
    });
  }

  /*
   * Utility to reorder list for react-beautiful-dnd
   * Scans the list only once.
   */
  reorder(array, fromIndex, toIndex) {
    return reorder(array, fromIndex, toIndex);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
}

function isEventLikeObject(evt) {
  // return evt && evt.target && evt.target.name && evt.preventDefault && evt.stopPropagation;
  return evt && evt.target && evt.target.name;
}
