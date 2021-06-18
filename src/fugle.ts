import axios, { AxiosPromise } from 'axios';
import WebSocket from 'isomorphic-ws';
import qs from 'qs';

export interface FugleOptions {
  apiToken?: string;
}

export interface FugleParams {
  symbolId: string;
  apiToken?: string;
  oddLot?: boolean;
}

export class Fugle {
  private static BASE_REALTIME_URL = 'https://api.fugle.tw/realtime';
  private static BASE_REALTIME_WS = 'wss://api.fugle.tw/realtime';
  private static VERSION = 'v0.2';
  private _apiToken: string;

  constructor(options: FugleOptions = {}) {
    this._apiToken = options.apiToken || '';
  }

  get apiToken(): string {
    return this._apiToken;
  }

  set apiToken(value) {
    this._apiToken = value;
  }

  public api(path: string, params: FugleParams): AxiosPromise {
    const url = this.compileUrl(path, { oddLot: false, ...params });
    return axios(url);
  }

  public ws(path: string, params: FugleParams): WebSocket {
    const url = this.compileUrl(path, params, 'ws');
    return new WebSocket(url);
  }

  private compileUrl(path: string, params: object, protocol?: string): string {
    params = { apiToken: this.apiToken, ...params };

    const baseUrl = (protocol === 'ws')
      ? Fugle.BASE_REALTIME_WS + '/' + Fugle.VERSION
      : Fugle.BASE_REALTIME_URL + '/' + Fugle.VERSION;

    /* istanbul ignore next */
    const endpoint = (path.indexOf('/') === 0) ? path : '/' + path;

    const query = '?' + qs.stringify(params);

    return baseUrl + endpoint + query;
  }
}

export default Fugle;
