import { DataType, Model } from 'sequelize-typescript';
import type { ModelAttributes } from 'sequelize/types';

export type IUserDb = {
    firstName: string;
    lastName: string;
}

export const userModel: ModelAttributes<Model, IUserDb> = {
  firstName: {
    type: DataType.STRING,
    allowNull: false
  },
  lastName: {
    type: DataType.STRING
  }
};
