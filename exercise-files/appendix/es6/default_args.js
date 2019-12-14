function divide(a, b) {
  // Default divisor to `1`
  const divisor = typeof b === 'undefined' ? 1 : b;

  return a / divisor;
}

function divide(a, b = 1) {
  return a / b;
}

divide(14, 2);
// => 7
divide(14, undefined);
// => 14
divide(14);
// => 14

divide(14, null); // `null` is used as divisor
// => Infinity    // 14 / null
