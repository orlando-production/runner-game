import type { Model } from 'sequelize/types';
import { dbConnect, Theme, ThemeUser } from './init';

// Добавление юзера с темой.
export async function addUserWithTheme(userId: number, themeId: number) {
  console.log(userId, themeId);
  return new Promise((resolve, reject) => {
    Theme.findOne({ where: { themeId } }).then((theme) => {
      if (!theme) {
        reject(new Error('Темы с таким themeId не существует.'));
      }
      ThemeUser.create({ userId, themeId }).then(() => {
        console.log('SUCCESS');
        resolve(true);
      });
    });
  });
}

export async function findUser(userId: number): Promise<Model> {
  return ThemeUser.findOne({ where: { userId } });
}

export async function createTheme(themeName: string): Promise<Model> {
  return Theme.create({ themeName });
}
export function startApp() {
  dbConnect().then(async () => {
    createTheme('light');
    createTheme('dark');
  });
}
