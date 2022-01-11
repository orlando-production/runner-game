import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export type TForumTopicDb = {
    id: number;
    title: string;
    text: string;
}

export type TTopicMessageDb = {
    id: number;
    author: string;
    text: string;
}

export const forumTopicModel: ModelAttributes<Model, TForumTopicDb> = {
  id: {
    primaryKey: true,
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  },
  text: {
    type: DataType.STRING,
    allowNull: false,
    unique: false
  }
};

export const topicMessage: ModelAttributes<Model, TTopicMessageDb> = {
  id: {
    primaryKey: true,
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  author: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  },
  text: {
    type: DataType.STRING,
    allowNull: false,
    unique: false
  }
};
