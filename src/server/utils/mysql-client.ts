import { getConfigurationValue , appLogs } from 'config';
import * as Sequelize from 'sequelize';

const databaseConfig = getConfigurationValue('database');

// tslint:disable-next-line:prefer-object-spread
const options = Object.assign(databaseConfig, {
  logging: appLogs.info.bind(appLogs),
});

export const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  options,
);
