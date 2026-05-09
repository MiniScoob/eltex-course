
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/eltex-course/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/eltex-course"
  },
  {
    "renderMode": 0,
    "route": "/eltex-course/blog"
  },
  {
    "renderMode": 0,
    "route": "/eltex-course/blog/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24946, hash: 'f9f16ff18be44546db49b295e8391acd1981c1768342164b8201091c7f43252b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17165, hash: 'a60f033736ae690e765713f3d7468079719e32debab33d7780f7017d2aa83785', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-GL5Z4K2T.css': {size: 10962, hash: '3WYznfMZxOM', text: () => import('./assets-chunks/styles-GL5Z4K2T_css.mjs').then(m => m.default)}
  },
};
