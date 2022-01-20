import { themeModel } from 'db/models/theme';
import { themeUserModel } from 'db/models/themeUser';
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

export const ThemeUser = sequelize.define('ThemesUser', themeUserModel, {});
export const Theme = sequelize.define('Theme', themeModel, {});

Theme.hasOne(ThemeUser, {
  foreignKey: 'themeId', // Name for new column added to Bar
  sourceKey: 'themeId', // Column in Foo that FK will reference to
  // The possible choices are RESTRICT, CASCADE, NO ACTION, SET DEFAULT and SET NULL
  onDelete: 'RESTRICT', // Default is SET NULL
  onUpdate: 'RESTRICT' // Default is CASCADE
});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
