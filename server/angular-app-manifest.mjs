
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'eltex-course',
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
    'index.csr.html': {size: 935, hash: '9e76c6316754c0f931a17ec1ef957fa95ab75d8776b3b12cdf117959a9e20c0c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 980, hash: '91b9a2573ac3e63d92b156b86902e8a6170624843e01ac3ad8e570235b11101b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-2MVK2HSS.css': {size: 2671, hash: 'oH5U64PLUdU', text: () => import('./assets-chunks/styles-2MVK2HSS_css.mjs').then(m => m.default)}
  },
};
