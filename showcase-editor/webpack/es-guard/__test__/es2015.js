/* eslint-disable */

// arrowFunction
var arrowFunction = () => {};

// let
let a = 1;

// const
const b = 2;

// class
class Class {}

// template string
`template ${string}`;

var obj = {
  // objectMethodProperty
  foo() {},
  // objectShorthandProperty
  a,
  // objectComputedProperty
  ['b']: 2,
};

// arrayDestructuring
var [c, d] = [2, 1];

// objectDestructuring
var { e } = { e: 1 };

// spread
var spreadVar = {
  ...{ test: 1 },
};

// defaultParameter
function defaultParamFunc(a = 1) {}

// restParameter
function restParamFunc(...rest) {}

// forOf
for (var el of object) {
}

// generator
function* generator() {
  // yield
  yield 1;
}

// regexpFlagY
/a/y;

// regexpFlagU
/a你好/u;

// newTarget
new (function() {
  new.target;
})();

// octalLiteral
0o11;

// binaryLiteral
0b10;
