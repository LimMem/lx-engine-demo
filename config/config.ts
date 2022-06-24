import { defineConfig } from 'alita';
import proxy from './proxy';

export default defineConfig({
  appType: 'h5',
  mobileLayout: true,
  // 如果不启用压缩 JS/CSS, 那么同时保留 console.log 以便排查问题
  // https://umijs.org/docs/env-variables#compress
  define: {
    "process.env.REACT_APP_REQUEST_PREFIX": "../server/"
  },
  proxy,
  keepalive: [],
});
