const inversify = require('inversify');
const mongoose = require('mongoose');

class Database {
  async connect() {
    return mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }
}

inversify.decorate(inversify.injectable(), Database);

module.exports = Database;
