import { ThemeType } from 'components/themeSwitcher/themesSlice';
import type { Model } from 'sequelize/types';
import { dbConnect, Theme, ThemeUser } from './init';

// Добавление юзера с темой.
export async function setUserTheme(userId: number, themeId: number) {
  return new Promise((resolve, reject) => {
    Theme.findOne({ where: { themeId } }).then((theme) => {
      if (!theme) {
        reject(new Error('Темы с таким themeId не существует.'));
      }
      ThemeUser.findOne({ where: { userId } }).then((rec) => {
        if (!rec) {
          ThemeUser.create({ userId, themeId }).then(() => {
            resolve(true);
          });
        } else {
          ThemeUser.update({ themeId }, { where: { userId } }).then(() => {
            resolve(true);
          });
        }
      });
    });
  });
}

export async function findUser(userId: number): Promise<Model> {
  return ThemeUser.findOne({ where: { userId } });
}

export function getUserTheme(userId: number) {
  return new Promise((resolve) => {
    findUser(userId).then((res) => {
      if (res) {
        resolve((res as unknown as ThemeType).themeId);
      } else {
        setUserTheme(userId, 1);
        resolve(1);
      }
    });
  });
}

export async function createThemeIfNotExist(
  themeId: number,
  themeName: string
): Promise<boolean> {
  return new Promise((resolve) => {
    Theme.findOne({ where: { themeName, themeId } }).then((res) => {
      if (!res) {
        Theme.create({ themeName, themeId }).then(() => resolve(true));
      } else {
        resolve(false);
      }
    });
  });
}

export async function getAllThemes(): Promise<Model<any, any>[]> {
  return Theme.findAll({ raw: true });
}
export async function startApp() {
  await dbConnect();
  createThemeIfNotExist(1, 'light');
  createThemeIfNotExist(2, 'dark');
}
