
import * as Sequelize from 'sequelize';
import { sequelize } from 'utils/mysql-client';

const Test = sequelize.define(
  'test',
  {
    session_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: 'sessions_compositeIndex',
    },
    expires: { type: Sequelize.INTEGER, allowNull: false },
    data: { type: Sequelize.STRING(14235) },
  },
  {
    timestamps: false,
  },
);
Test.sync();
export default Test;
