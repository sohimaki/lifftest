// src/axios.js
import axios from 'axios';
import config from '@/config.js'

const AzureFunctionBaseUri = config.AZUREFUNCTIONBASE_URI;

const instance = axios.create({
  baseURL: AzureFunctionBaseUri,
});

// デフォルトのインターセプターを設定する（オプション）
instance.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default instance;
