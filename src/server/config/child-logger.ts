import * as _ from 'lodash';
import * as bunyan from 'bunyan';
import * as moment from 'moment';
import * as querystring from 'querystring';
const rfs = require('rotating-file-stream');

function findKey(object: { [key: string]: any }, key: string) {
  if (_.has(object, key)) {
    return object[key];
  }
  for (const objKey in object) {
    if (_.isPlainObject(object[objKey])) {
      const o: any = findKey(object[objKey], key);
      if (o !== null) {
        return o;
      }
    }
  }
  return null;
}

function replaceStringParsing(keyVal: string, valVal: string, data: string) {
  try {
    const queryObject = querystring.parse(data);
    if (queryObject[keyVal]) {
      queryObject[keyVal] = valVal;
    }
    return querystring.stringify(queryObject);
  } catch (e) {
    return data;
  }
}

function replacePropertyValue(keyVal: string, valVal: string, object: any) {
  const newObject = _.clone(object);

  _.each(object, (val: string | { [key: string]: string }, key: string) => {
    if (key === 'data' && _.isString(newObject[key])) {
      newObject[key] = replaceStringParsing(keyVal, valVal, newObject[key]);
    } else if (key === 'url' && typeof newObject[key] === 'string') {
      const {
        queryString,
        baseUrl
      }: { queryString: string; baseUrl: string } = newObject[key];
      if (queryString) {
        newObject[key] = `${baseUrl}?${replaceStringParsing(
          keyVal,
          valVal,
          queryString
        )}`;
      }
    } else if (key === keyVal) {
      newObject[key] = valVal;
    } else if (typeof val === 'object' || Array.isArray(val)) {
      newObject[key] = replacePropertyValue(keyVal, valVal, val);
    }
  });

  return newObject;
}

class MaskingStream implements NodeJS.WritableStream {
  public addListener(): this {
    throw new Error('Method not implemented.');
  }
  public on(): this {
    throw new Error('Method not implemented.');
  }
  public once(): this {
    throw new Error('Method not implemented.');
  }
  public removeListener(): this {
    throw new Error('Method not implemented.');
  }
  public removeAllListeners(): this {
    throw new Error('Method not implemented.');
  }
  public setMaxListeners(): this {
    throw new Error('Method not implemented.');
  }
  public getMaxListeners(): number {
    throw new Error('Method not implemented.');
  }
  public listeners(): Function[] {
    throw new Error('Method not implemented.');
  }
  public emit(): boolean {
    throw new Error('Method not implemented.');
  }
  public listenerCount(): number {
    throw new Error('Method not implemented.');
  }
  public prependListener(): this {
    throw new Error('Method not implemented.');
  }
  public prependOnceListener(): this {
    throw new Error('Method not implemented.');
  }
  /* tslint:disable */
  public eventNames(): Array<string | symbol> {
    throw new Error("Method not implemented.");
  }
  public writable = true;
  private stream: NodeJS.WritableStream;
  constructor(opts: { stream: NodeJS.WritableStream }) {
    this.stream = opts.stream || process.stdout;
  }
  public write(data: string): boolean {
    try {
      const obj: { [key: string]: string } = JSON.parse(data);
      if (typeof obj !== "object") {
        this.stream.write(`${obj}\n`);
        return true;
      }
      const parsedData = obj;
      parsedData.time = moment(
        parsedData.time,
        "YYYY-MM-DDTHH:mm:ss.SSSSZ",
        true
      ).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

      this.stream.write(`${JSON.stringify(parsedData)}\n`);
    } catch (err) {
      this.stream.write(`${data}\n`);
    }
    return true;
  }
  public end(): void {
    return;
  }
}

export const createLogger = (
  appname: string,
  errorLogFile: string,
  appLogFile: string,
  logOptions: any
) =>
  bunyan.createLogger({
    name: appname,
    streams: [
      {
        level: "info",
        stream: new MaskingStream({
          stream: rfs(appLogFile, logOptions)
        })
      },
      {
        level: "error",
        stream: new MaskingStream({
          stream: rfs(errorLogFile, logOptions)
        })
      }
    ]
  });
