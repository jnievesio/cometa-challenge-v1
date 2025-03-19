import config from '../../config.json';

type Environment = 'development' | 'production';

type ConfigType = {
  [K in Environment]: {
    frontend: {
      url: string;
      api_url: string;
    };
    backend: {
      host: string;
      port: number;
    };
  };
};

const env = import.meta.env.MODE as Environment;
export const CONFIG = (config as ConfigType)[env];

export const API_URL = CONFIG.frontend.api_url;
