import * as fs from 'fs';
import * as _ from 'lodash';
import * as path from 'path';

const args: any = process.argv
  .slice(2)
  .reduce((result: { [k: string]: string }, arg) => {
    const tmp: string[] = arg.split('=');
    result[tmp[0]] = tmp[1];
    return result;
  }, {});

const configFilePath = path.join(__dirname, args.config);
console.log('this.configFilePath', configFilePath);
const config = JSON.parse(fs.readFileSync(configFilePath).toString());
export const getConfigurationValue = (key: string) => _.get(config, key);

export const getServiceUrl = (service: string, api: string): string => {
  const baseUrl = _.get(config, `${service}.baseUrl`);
  const route = _.get(config, `${service}.routes.${api}`);
  return baseUrl + route;
};

// set environment variables in config.
// _.set(
//   config,
//   'testKeyPath',
//   process.env.ENV_VARIABLE,
// );
