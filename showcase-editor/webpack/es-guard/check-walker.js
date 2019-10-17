const walk = require('acorn-walk');
const { isEmpty } = require('lodash');
const { rule } = require('./config');
const acornUtils = require('./acorn-utils');

module.exports = ast => {
  const checkResultMap = {};

  function report(ruleOption) {
    if (!checkResultMap[ruleOption.name]) {
      checkResultMap[ruleOption.name] = {
        ...ruleOption,
        times: 0,
      };
    }

    checkResultMap[ruleOption.name].times++;
  }

  function reportAssert(rule, extraCheckFn) {
    const [enable, options] = Array.isArray(rule) ? rule : [rule];
    if (enable && (!extraCheckFn || extraCheckFn())) {
      report(options);
    }
  }

  function handleWhileStatement(node, state, cb) {
    state.isInTestExpression = true;
    cb(node.test, state, 'Expression');
    state.isInTestExpression = false;

    cb(node.body, state, 'Statement');
  }

  // Custom walker
  const customBase = Object.assign({}, walk.base, {
    TryStatement(node, state, cb) {
      state.isInTryStatement = true;
      cb(node.block, state, 'Statement');
      state.isInTryStatement = false;

      if (node.handler) cb(node.handler, state);
      if (node.finalizer) cb(node.finalizer, state, 'Statement');
    },

    IfStatement(node, state, cb) {
      state.isInTestExpression = true;
      cb(node.test, state, 'Expression');
      state.isInTestExpression = false;

      cb(node.consequent, state, 'Statement');
      if (node.alternate) cb(node.alternate, state, 'Statement');
    },

    ConditionalExpression(node, state, cb) {
      state.isInTestExpression = true;
      cb(node.test, state, 'Expression');
      state.isInTestExpression = false;

      cb(node.consequent, state, 'Expression');
      cb(node.alternate, state, 'Expression');
    },

    ForStatement(node, state, cb) {
      if (node.init) cb(node.init, state, 'ForInit');

      state.isInTestExpression = true;
      if (node.test) cb(node.test, state, 'Expression');
      state.isInTestExpression = false;

      if (node.update) cb(node.update, state, 'Expression');
      cb(node.body, state, 'Statement');
    },

    SwitchStatement(node, state, cb) {
      cb(node.discriminant, state, 'Expression');
      for (let i = 0; i < node.cases.length; ++i) {
        let cs = node.cases[i];
        if (cs.test) {
          state.isInTestExpression = true;
          cb(cs.test, state, 'Expression');
          state.isInTestExpression = false;
        }
        for (let j = 0; j < cs.consequent.length; ++j) {
          cb(cs.consequent[j], state, 'Statement');
        }
      }
    },

    DoWhileStatement: handleWhileStatement,
    WhileStatement: handleWhileStatement,
  });

  const initialState = {
    isInTestExpression: false,
    isInTryStatement: false,
  };

  const noESModule = node => reportAssert(rule.esmodule);

  walk.ancestor(
    ast,
    {
      ArrowFunctionExpression(node) {
        reportAssert(rule.arrowFunction);
        // async arrow function will report two error
        reportAssert(rule.async, () => node.async);
      },

      BinaryExpression(node) {
        reportAssert(rule.exponentiation, () => node.operator === '**');
      },

      ClassDeclaration(node) {
        reportAssert(rule.class);
      },

      TemplateLiteral(node) {
        reportAssert(rule.templateString);
      },

      ObjectExpression(node) {
        node.properties.forEach(property => {
          reportAssert(rule.objectMethodProperty, () => property.method);
          reportAssert(rule.objectShorthandProperty, () => property.shorthand);
          reportAssert(rule.objectComputedProperty, () => property.computed);
        });
      },

      ArrayPattern(node) {
        reportAssert(rule.arrayDestructuring);
      },

      ObjectPattern(node) {
        reportAssert(rule.objectDestructuring);
      },

      AssignmentPattern(node) {
        reportAssert(rule.defaultParameter);
      },

      AssignmentExpression(node) {
        reportAssert(rule.exponentiationAssignment, () => node.operator === '**=');
      },

      RestElement(node) {
        reportAssert(rule.restParameter);
      },

      SpreadElement(node) {
        reportAssert(rule.spread);
      },

      VariableDeclaration(node) {
        reportAssert(rule.let, () => node.kind === 'let');
        reportAssert(rule.const, () => node.kind === 'const');
      },

      ForOfStatement(node) {
        reportAssert(rule.forOf);
      },

      FunctionDeclaration(node) {
        reportAssert(rule.generator, () => node.generator);
        reportAssert(rule.async, () => node.async);
      },

      CallExpression(node) {
        reportAssert(rule.dynamicImport, () => acornUtils.isIdentifier(node.callee, 'import'));
      },

      AwaitExpression(node) {
        reportAssert(rule.await);
      },

      YieldExpression(node) {
        reportAssert(rule.yield);
      },

      CatchClause(node) {
        reportAssert(rule.catchWithoutParameter, () => !node.param);
      },

      Literal(node) {
        const { regex } = node;
        reportAssert(
          rule.regexpFlagY,
          () => regex && regex.flags && regex.flags.indexOf('y') !== -1
        );
        reportAssert(
          rule.regexpFlagU,
          () => regex && regex.flags && regex.flags.indexOf('u') !== -1
        );
        reportAssert(rule.octalLiteral, () => acornUtils.isOctalLiteral(node));
        reportAssert(rule.binaryLiteral, () => acornUtils.isBinaryLiteral(node));
        reportAssert(rule.bigint, () => 'bigint' in node);
      },

      MetaProperty(node) {
        reportAssert(
          rule.newTarget,
          () =>
            acornUtils.isIdentifier(node.meta, 'new') &&
            acornUtils.isIdentifier(node.property, 'target')
        );
      },

      ExportNamedDeclaration: noESModule,
      ExportDefaultDeclaration: noESModule,
      ExportAllDeclaration: noESModule,
      ImportDeclaration: noESModule,
    },
    customBase,
    initialState
  );

  return isEmpty(checkResultMap) ? null : checkResultMap;
};
