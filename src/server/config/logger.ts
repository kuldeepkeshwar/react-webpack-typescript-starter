import * as express from 'express';
import * as fs from 'fs';
import * as logger from 'morgan';
import * as path from 'path';
import { createLogger } from './child-logger';
import { getConfigurationValue } from './config';

const rfs = require('rotating-file-stream');

const createFile = (filename: string) => {
  fs.open(filename, 'r', err => {
    if (err) {
      fs.writeFile(filename, '', error => {
        if (error) {
          // tslint:disable-next-line:no-console
          console.log(error);
        }
        // tslint:disable-next-line:no-console
        console.log('The file was saved!', filename);
      });
    } else {
      // tslint:disable-next-line:no-console
      console.log('The file exists!', filename);
    }
  });
};
const logDir = getConfigurationValue('logDir');
const hostname = getConfigurationValue('hostname');

const logDirectory = path.join(logDir);
const appname = getConfigurationValue('app.name');
const appLogFileName = `${hostname}-application.log`;
const errorLogFileName = `${hostname}-error.log`;
const accessLogPath = `${hostname}-access.log`;

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const appLogFile = path.join(logDir, appLogFileName);
createFile(appLogFile);
const errorLogFile = path.join(logDir, errorLogFileName);
createFile(errorLogFile);

const logOptions: any = {
  size: '1G',
  interval: '1d',
  compress: 'gzip',
  path: logDirectory
};

export const appLogs = createLogger(
  appname,
  errorLogFileName,
  appLogFileName,
  logOptions
);

const accessLogStream = rfs(accessLogPath, logOptions);

logger.token(
  'Request-Token',
  (req: express.Request): any => req.headers['Request-Token']
);

export const loggerMiddleware = logger(
  /* tslint:disable */
  '[:date[iso]] :remote-addr ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms ":user-agent" ":referrer" :Request-Token',
  { stream: accessLogStream }
);
