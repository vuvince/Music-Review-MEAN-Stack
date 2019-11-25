// src/app/core/env.config.ts
//source https://auth0.com/blog/real-world-angular-series-part-2/
const _isDev = window.location.port.indexOf("8080") > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = _isDev ? "http://localhost:8081/api/" : `/api/`;

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};
