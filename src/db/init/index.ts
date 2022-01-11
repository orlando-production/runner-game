import { Sequelize } from 'sequelize';
import { SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'orlando',
  dialect: 'postgres'

};

export const sequelize = new Sequelize(sequelizeOptions);

// export const User = sequelize.define('User', userModel, {});

export async function dbConnect() {
  try {
    console.log('try auth');
    await sequelize.authenticate(); // Проверка аутентификации в БД
    console.log('try sync');
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
