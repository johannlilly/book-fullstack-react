const coffee = { };
const noCream = { cream: false };
const noMilk = { milk: false };
Object.assign(coffee, noCream);
// coffee is now: `{ cream: false }`
Object.assign(coffee, noMilk);
// coffee is now: `{ cream: false, milk: false }`

const coffeeWithMilk = Object.assign({}, coffee, { milk: true });
// coffeeWithMilk is: `{ cream: false, milk: true }`
// coffee was not modified: `{ cream: false, milk: false }`
