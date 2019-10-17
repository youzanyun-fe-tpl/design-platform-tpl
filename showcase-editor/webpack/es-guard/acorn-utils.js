function isIdentifier(node, name) {
  return node && node.type === 'Identifier' && node.name === name;
}

function isOctalLiteral(node) {
  return (
    node && node.type === 'Literal' && typeof node.value === 'number' && /0o[0-7]+/i.test(node.raw)
  );
}

function isBinaryLiteral(node) {
  return (
    node && node.type === 'Literal' && typeof node.value === 'number' && /0b[0-1]+/.test(node.raw)
  );
}

module.exports = {
  isIdentifier,
  isOctalLiteral,
  isBinaryLiteral,
};
