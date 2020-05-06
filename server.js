require('reflect-metadata');
require('dotenv').config();

const { container } = require('./src/di-container');
const { TYPES } = require('./src/common');
const appFactory = require('./src/app');

(async () => {
  const HTTP_PORT = process.env.HTTP_PORT || process.env.PORT || 3000;
  const database = container.get(TYPES.Database);
  const app = appFactory(container);
  await database.connect();
  console.log('Database connection established');
  app.listen(HTTP_PORT, () => {
    console.log(`Server started on port ${HTTP_PORT}`);
  });
})();
