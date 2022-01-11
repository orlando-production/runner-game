import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IThemeDb {
  themeId: number;
  themeName: string;
}

export const themeModel: ModelAttributes<Model, IThemeDb> = {
  themeId: {
    primaryKey: true,
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  themeName: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  }
};
