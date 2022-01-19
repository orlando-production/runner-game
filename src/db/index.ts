import type { Model } from 'sequelize/types';
import {
  dbConnect, ForumTopic, Theme, ThemeUser, TopicMessage
} from './init';

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
          ThemeUser.update({ themeId }, { where: { userId } });
        }
      });
    });
  });
}

export async function setTopic(title: string, text: number) {
  return new Promise((resolve, reject) => {
    if (!title && !text) {
      reject(new Error('Данные не валидны'));
    }
    ForumTopic.create({ title, text }).then((data) => {
      const topic = data.get({ plain: true });
      resolve(topic);
    });
  });
}

export async function getTopics(id: number = null) {
  return new Promise((resolve, reject) => {
    if (!id) {
      ForumTopic.findAll({ raw: true })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          reject(new Error('Что то пошло не так'));
        });
    } else {
      ForumTopic.findOne({ where: { id }, raw: true }).then((topic) => {
        resolve(topic);
      });
    }
  });
}

export async function setMessage(id: number, author: string, text: string) {
  return new Promise((resolve, reject) => {
    if (!id && !author && !text) {
      reject(new Error('Данные не валидны'));
    }
    TopicMessage.create({ ForumTopicId: id, author, text })
      .then((data) => {
        // eslint-disable-next-line no-shadow
        const { id } = data.get({ plain: true });

        TopicMessage.findOne({ where: { id }, raw: true }).then((message) => {
          resolve(message);
        });
      });
  });
}

export async function getMessages(id: number) {
  return new Promise((resolve, reject) => {
    TopicMessage.findAll({ where: { ForumTopicId: id }, raw: true }).then((messages) => {
      if (!messages) {
        reject(new Error('Нет сообщений!'));
      } else {
        resolve(messages);
      }
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
        resolve(res.themeId);
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
export function startApp() {
  dbConnect().then(async () => {
    createThemeIfNotExist(1, 'light');
    createThemeIfNotExist(2, 'dark');
  });
}
