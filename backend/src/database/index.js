import Sequelize from 'sequelize';

import databaseConfig from '../config/database';
import User from '../app/models/user/User';
import File from '../app/models/files/File';
import Meetup from '../app/models/meetup/Meetup';

const models = [User, File, Meetup];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
