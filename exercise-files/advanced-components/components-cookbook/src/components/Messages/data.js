const faker = require('faker');
const moment = require('moment');

const defineFakeUsers = () => ({
  uuid: faker.random.uuid(),
  username: faker.internet.userName(),
  avatar: faker.internet.avatar(),
  lastOnline: faker.date.recent(),
});

const times = n =>
  (f) => {
    return Array(n).fill().map((x, i) => f(i));
  };

const defineMessage = (participants, numMessages) => {
  const generateMessage = count => ({
    uuid: faker.random.uuid(),
    from: faker.random.arrayElement(participants),
    text: faker.lorem.sentence(),
    sentAt: faker.date.recent(),
  });
  const messages = times(numMessages)(generateMessage).sort((a, b) =>
    moment(a.sentAt).isBefore(moment(b.sentAt)));
  return messages;
};

const defineMessages = (count) => {
  const users = times(count)(defineFakeUsers);
  const userIds = users.map(u => u.uuid);
  const messages = times(count)((i) => {
    const list = defineMessage([ userIds[i], 'me' ], 5);
    return {
      uuid: faker.random.uuid(),
      title: users[i].username,
      lastActiveAt: list[0].sentAt,
      thread: list,
    };
  });
  const sorted = messages.sort((a, b) =>
    moment(a.lastActiveAt).isAfter(moment(b.lastActiveAt)));
  return { messages: sorted, users };
};

module.exports = defineMessages;
