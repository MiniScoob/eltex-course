
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/eltex-course/',
  locale: undefined,
  routes: [
  {
    "renderMode": 1,
    "route": "/eltex-course"
  },
  {
    "renderMode": 1,
    "route": "/eltex-course/blog"
  },
  {
    "renderMode": 1,
    "route": "/eltex-course/blog/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24946, hash: '3e39adb8adbc50abb46316db64d5994c6bc90b437b4240201d16f1c4c240b1d3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17165, hash: '244dd6ee416b2dcadb9d881972b25318f6b10e6c73630bbcd21670d9d2599d86', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-GL5Z4K2T.css': {size: 10962, hash: '3WYznfMZxOM', text: () => import('./assets-chunks/styles-GL5Z4K2T_css.mjs').then(m => m.default)}
  },
};
