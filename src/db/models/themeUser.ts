import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export interface IThemeUserDb {
  userId: string;
  themeId: number;
}

export const themeUserModel: ModelAttributes<Model, IThemeUserDb> = {
  userId: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  themeId: {
    type: DataType.INTEGER
  }
};
