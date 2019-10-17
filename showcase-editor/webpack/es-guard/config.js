const os = require('os');
const getOutputPath = require('../utils/get-output-path');

const cwd = process.env.ES_GUARD_CWD || getOutputPath();

console.log('"acorn-walk": "^7.0.0",', cwd);

const rule = {
  // es2015
  arrowFunction: [true, { demo: 'a => 1' }],

  esmodule: [true, { demo: 'import ... from ...;\nexport ...' }],

  class: [true, { demo: 'class Foo {}' }],

  templateString: [true, { demo: '`${foo}`' }],

  objectMethodProperty: [true, { demo: '{foo(){}}' }],
  objectShorthandProperty: [true, { demo: '{a}' }],
  objectComputedProperty: [true, { demo: '{[a]: 1}' }],

  arrayDestructuring: [true, { demo: '[a, b] = [1, 2]' }],
  objectDestructuring: [true, { demo: '{a} = {a: 1}' }],

  spread: [true, { demo: '...args' }],
  defaultParameter: [true, { demo: 'function foo(b = 1)' }],
  restParameter: [true, { demo: 'function foo(...args)' }],

  let: [true, { demo: 'let a = 1' }],
  const: [true, { demo: 'const b = 2' }],

  forOf: [true, { demo: 'for (const i of x) {}', name: 'for...of' }],

  generator: [true, { demo: 'function* foo() {}' }],
  yield: [true, { demo: 'yield 1' }],

  regexpFlagY: [true, { demo: '/a/y' }],
  regexpFlagU: [true, { demo: '/a你好/u' }],

  newTarget: [true, { demo: 'new function(){new.target === f}', name: 'new.target' }],

  octalLiteral: [true, { demo: '0o17' }],
  binaryLiteral: [true, { demo: '0b10' }],

  // es2016
  exponentiation: [true, { demo: 'x ** y' }],
  exponentiationAssignment: [true, { demo: 'x **= y' }],

  // es2017
  async: [true, { demo: 'async function() {}' }],
  await: [true, { demo: 'await ...' }],

  // es2018

  // es2019
  catchWithoutParameter: [true, { demo: 'try { foo() } catch { bar() }' }],

  // es2020
  bigint: [true, { demo: 'const a = 2n' }],
  dynamicImport: [true, { demo: `import('module')` }],
};

// 添加默认 rule name
for (const key in rule) {
  if (rule.hasOwnProperty(key)) {
    const element = rule[key];
    if (!element[1].name) {
      element[1].name = key.replace(/[A-Z]/g, s => ` ${s.toLowerCase()}`);
    }
  }
}

// acorn parser options
const parserOptions = {
  ecmaVersion: 11,
  sourceType: 'script',
  locations: true,
};

module.exports = {
  rule,
  parallel: Math.max(os.cpus().length - 1, 1),
  cwd,
  includes: ['**/*.js'],
  excludes: [],
  parserOptions,
};
