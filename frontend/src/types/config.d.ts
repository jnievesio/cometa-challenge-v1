declare module '@config' {
  interface Config {
    development: {
      frontend: {
        url: string;
        api_url: string;
      };
      backend: {
        host: string;
        port: number;
      };
    };
    production: {
      frontend: {
        url: string;
        api_url: string;
      };
      backend: {
        host: string;
        port: number;
      };
    };
  }

  const config: Config;
  export default config;
}
