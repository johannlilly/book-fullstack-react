const faker = require('faker');

const defineFakeUser = () => ({
  'first name': faker.name.firstName(),
  'last name': faker.name.lastName(),
  'title': faker.name.title(),
  'phone': faker.phone.phoneNumber(),
  'homepage': faker.internet.url(),
  'avatar': faker.internet.avatar(),
  'address': faker.address.streetAddress(),
  'address 2 (optional)': faker.address.secondaryAddress(),
  'state': faker.address.state(),
  'zip code': faker.address.zipCode(),
  'city': faker.address.city(),
});

const times = n =>
  (f) => {
    return Array(n).fill().map((x, i) => f(i));
  };

module.exports = count => times(count)(defineFakeUser);
