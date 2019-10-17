import cloneDeep from 'lodash/cloneDeep';

export function numberToBoolean(str) {
  return !!Number(str);
}

export function booleanToString(boolValue) {
  return boolValue ? '1' : '0';
}

/**
 * Create an array with obj repeated n times.
 * @param {object} obj Object to repeat
 * @param {number} n How many times to repeat
 */
export function repeat(obj, n) {
  const ret = new Array(n);

  for (let i = 0; i < n; i++) {
    ret[i] = cloneDeep(obj);
  }

  return ret;
}

export function isEventLikeObject(evt) {
  // return evt && evt.target && evt.target.name;
  return evt && evt.target && evt.target.name && evt.preventDefault && evt.stopPropagation;
}

/**
 * 将枚举对象转换为数组，并按照index的大小排序
 * @param {Object} obj
 */
export function transEnum2List(obj) {
  return Object.entries(obj)
    .map(([key, value]) => ({
      ...value,
      key,
    }))
    .sort((x, y) => x.index - y.index);
}
