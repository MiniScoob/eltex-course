
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/eltex-course/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/eltex-course"
  },
  {
    "renderMode": 2,
    "route": "/eltex-course/blog"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 937, hash: 'fd77e5e50e40126fe4d427bb8bffa909331af469576993094a5b22c1a1e3bd3e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 982, hash: '3cc0e03b803c06592e7f319c5d7e608a37966d8ab6099cb62ec872e71de7cbe4', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'blog/index.html': {size: 18354, hash: 'b6e0ced6f0d5171130eb72cbc486fdb6ff595adb62fa84fc4e038bb7830b0273', text: () => import('./assets-chunks/blog_index_html.mjs').then(m => m.default)},
    'index.html': {size: 26044, hash: 'd8a0aae9e27d4e55d99a68b3dea98660ad23038ef91fc5154e480dba0d6c8f57', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-2MVK2HSS.css': {size: 2671, hash: 'oH5U64PLUdU', text: () => import('./assets-chunks/styles-2MVK2HSS_css.mjs').then(m => m.default)}
  },
};
