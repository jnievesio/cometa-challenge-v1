import config from '@config';

type Environment = 'development' | 'production';

type ConfigType = {
  /* eslint-disable-next-line no-unused-vars */
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

const env = (import.meta.env.VITE_ENV || import.meta.env.MODE) as Environment;
export const CONFIG = (config as ConfigType)[env];

export const API_URL = import.meta.env.VITE_API_URL || CONFIG.frontend.api_url;
