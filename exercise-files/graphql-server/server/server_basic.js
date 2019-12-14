console.log({ starting: true });

import express from 'express';

const app = express();

app.use('/graphql', (req, res) => {
  res.send({ data: true });
});

app.listen(3000, () => {
  console.log({ running: true });
});
